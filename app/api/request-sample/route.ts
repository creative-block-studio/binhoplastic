import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const resendApiKey = process.env.RESEND_API_KEY;
const recipientEmail = process.env.CONTACT_FORM_TO_EMAIL ?? 'binhoplastic@gmail.com';
const senderEmail =
  process.env.CONTACT_FORM_FROM_EMAIL ?? 'Binho Plastic <site@mailer.binhoplastic.com.br>';
const bccEmail = process.env.CONTACT_FORM_BCC_EMAIL;
const maxRequestsPerWindow = 5;
const rateLimitWindowMs = 10 * 60 * 1000;

const processOptions = new Set(['Injeção', 'Sopro', 'Extrusão', 'Filme', 'Fios e cabos', 'Outro']);
const resinOptions = new Set(['PE', 'PP', 'PS', 'PVC', 'PET', 'ABS', 'Outro']);

type RequestSamplePayload = {
  fullName?: unknown;
  company?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
  processes?: unknown;
  resins?: unknown;
  companyWebsite?: unknown;
};

type GlobalRateLimitStore = typeof globalThis & {
  __requestSampleRateLimit?: Map<string, number[]>;
};

const globalRateLimitStore = globalThis as GlobalRateLimitStore;
const requestSampleRateLimit =
  globalRateLimitStore.__requestSampleRateLimit ?? new Map<string, number[]>();

if (!globalRateLimitStore.__requestSampleRateLimit) {
  globalRateLimitStore.__requestSampleRateLimit = requestSampleRateLimit;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeSelection(value: unknown, allowedValues: Set<string>) {
  if (!Array.isArray(value)) return [];

  return Array.from(
    new Set(
      value
        .filter((item): item is string => typeof item === 'string')
        .map((item) => item.trim())
        .filter((item) => allowedValues.has(item)),
    ),
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown';
  }

  return request.headers.get('x-real-ip') ?? 'unknown';
}

function isRateLimited(clientIp: string) {
  const now = Date.now();
  const timestamps = requestSampleRateLimit.get(clientIp) ?? [];
  const recentTimestamps = timestamps.filter((timestamp) => now - timestamp < rateLimitWindowMs);

  if (recentTimestamps.length >= maxRequestsPerWindow) {
    requestSampleRateLimit.set(clientIp, recentTimestamps);
    return true;
  }

  recentTimestamps.push(now);
  requestSampleRateLimit.set(clientIp, recentTimestamps);
  return false;
}

function buildEmailHtml({
  fullName,
  company,
  phone,
  email,
  message,
  processes,
  resins,
}: {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  processes: string[];
  resins: string[];
}) {
  const messageHtml = message
    ? escapeHtml(message).replaceAll('\n', '<br />')
    : 'Nenhuma mensagem adicional enviada.';

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #171717; line-height: 1.5;">
      <h1 style="font-size: 20px; margin-bottom: 16px;">Nova solicitação de amostra</h1>
      <p><strong>Nome:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Empresa:</strong> ${escapeHtml(company)}</p>
      <p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Processos:</strong> ${escapeHtml(processes.join(', '))}</p>
      <p><strong>Resinas:</strong> ${escapeHtml(resins.join(', '))}</p>
      <p><strong>Mensagem:</strong><br />${messageHtml}</p>
    </div>
  `;
}

function buildEmailText({
  fullName,
  company,
  phone,
  email,
  message,
  processes,
  resins,
}: {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  processes: string[];
  resins: string[];
}) {
  return [
    'Nova solicitação de amostra',
    '',
    `Nome: ${fullName}`,
    `Empresa: ${company}`,
    `Telefone: ${phone}`,
    `E-mail: ${email}`,
    `Processos: ${processes.join(', ')}`,
    `Resinas: ${resins.join(', ')}`,
    '',
    'Mensagem:',
    message || 'Nenhuma mensagem adicional enviada.',
  ].join('\n');
}

export async function POST(request: NextRequest) {
  if (!resendApiKey) {
    return NextResponse.json(
      { error: 'A integracao de e-mail ainda nao foi configurada no servidor.' },
      { status: 500 },
    );
  }

  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        error:
          'Muitas tentativas em pouco tempo. Aguarde alguns minutos antes de enviar novamente.',
      },
      { status: 429 },
    );
  }

  let payload: RequestSamplePayload;

  try {
    payload = (await request.json()) as RequestSamplePayload;
  } catch {
    return NextResponse.json({ error: 'Nao foi possivel ler os dados enviados.' }, { status: 400 });
  }

  const fullName = normalizeText(payload.fullName);
  const company = normalizeText(payload.company);
  const phone = normalizeText(payload.phone);
  const email = normalizeText(payload.email);
  const message = normalizeText(payload.message);
  const companyWebsite = normalizeText(payload.companyWebsite);
  const processes = normalizeSelection(payload.processes, processOptions);
  const resins = normalizeSelection(payload.resins, resinOptions);

  if (companyWebsite) {
    return NextResponse.json({ message: 'Solicitacao recebida.' }, { status: 200 });
  }

  if (!fullName || !company || !phone || !email) {
    return NextResponse.json({ error: 'Preencha todos os campos obrigatorios.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Informe um e-mail valido.' }, { status: 400 });
  }

  if (processes.length === 0 || resins.length === 0) {
    return NextResponse.json(
      { error: 'Selecione ao menos um processo e uma resina.' },
      { status: 400 },
    );
  }

  if (fullName.length > 120 || company.length > 120 || phone.length > 40 || message.length > 4000) {
    return NextResponse.json({ error: 'Revise os dados e tente novamente.' }, { status: 400 });
  }

  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from: senderEmail,
    to: [recipientEmail],
    ...(bccEmail ? { bcc: [bccEmail] } : {}),
    replyTo: [email],
    subject: `Nova solicitacao de amostra - ${company}`,
    html: buildEmailHtml({ fullName, company, phone, email, message, processes, resins }),
    text: buildEmailText({ fullName, company, phone, email, message, processes, resins }),
  });

  if (error) {
    console.error('request-sample email error', error);

    return NextResponse.json(
      { error: 'Nao foi possivel enviar sua solicitacao agora. Tente novamente em instantes.' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    message: 'Solicitação enviada com sucesso. Nosso time retorna em breve.',
  });
}
