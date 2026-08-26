import { useRef, useState } from 'react';

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const fieldStyle: React.CSSProperties = {
  padding: '14px 16px',
  borderRadius: 16,
  border: '1px solid rgba(255,255,255,.1)',
  background: 'rgba(255,255,255,.02)',
  color: '#F2F3F7',
  fontSize: 15,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '.02em',
  color: '#9698A6',
};

const errStyle: React.CSSProperties = { fontSize: 12, color: '#FF8A8A' };

export function Contact() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Ported from DC's submit(): validate, focus first error, then fake a POST.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = (nameRef.current?.value || '').trim();
    const email = (emailRef.current?.value || '').trim();
    const message = (msgRef.current?.value || '').trim();
    const next: Errors = {};
    if (name.length < 2) next.name = 'Please tell me your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = 'A valid email address, please.';
    if (message.length < 10)
      next.message = 'A little more detail helps — 10 characters minimum.';

    if (Object.keys(next).length) {
      setErrors(next);
      setSent(false);
      const first = next.name ? nameRef : next.email ? emailRef : msgRef;
      first.current?.focus();
      return;
    }

    setErrors({});
    setSending(true);
    setSent(false);
    // Swap this timeout for a real POST to your form endpoint.
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  const submitLabel = sending ? 'Sending…' : 'Send Message';

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      data-screen-label="Contact"
      style={{
        maxWidth: 1280,
        width: '100%',
        margin: '0 auto',
        padding: 'clamp(56px,7vw,88px) clamp(20px,3vw,40px)',
        display: 'grid',
        gap: 'clamp(32px,4vw,48px)',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))',
      }}
    >
      <div
        className="reveal"
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: '#7A7C88',
          }}
        >
          Contact
        </span>
        <h2
          id="contact-title"
          style={{
            fontSize: 'clamp(28px,3.4vw,42px)',
            lineHeight: 1.12,
            letterSpacing: '-.03em',
            fontWeight: 600,
            maxWidth: '16ch',
          }}
        >
          Let&apos;s build something great together.
        </h2>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.75,
            color: '#7A7C88',
            maxWidth: '38ch',
          }}
        >
          Have a project in mind or just want to say hi? I&apos;d love to hear
          from you.
        </p>
        <ul
          style={{
            listStyle: 'none',
            margin: '8px 0 0',
            padding: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <li>
            <a
              href="mailto:parasuxdesign@gmail.com"
              className="contact-chip"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                minHeight: 48,
                padding: '12px 18px',
                borderRadius: 16,
                background: 'rgba(255,255,255,.03)',
                border: '1px solid rgba(255,255,255,.09)',
                color: '#C1C3CD',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <span aria-hidden="true">✉</span> parasuxdesign@gmail.com
            </a>
          </li>
          <li>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                minHeight: 48,
                padding: '12px 18px',
                borderRadius: 16,
                background: 'rgba(255,255,255,.03)',
                border: '1px solid rgba(255,255,255,.09)',
                fontSize: 13,
                fontWeight: 500,
                color: '#C1C3CD',
              }}
            >
              <span aria-hidden="true">◎</span> Noida, India
            </span>
          </li>
        </ul>
      </div>

      <form
        noValidate
        onSubmit={submit}
        className="reveal"
        data-delay="80"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          padding: 'clamp(20px,3vw,32px)',
          borderRadius: 24,
          background:
            'linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015))',
          border: '1px solid rgba(255,255,255,.07)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label htmlFor="cf-name" style={labelStyle}>
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            ref={nameRef}
            placeholder="Your name"
            className="field"
            style={{ ...fieldStyle, minHeight: 52 }}
          />
          {errors.name && (
            <span role="alert" style={errStyle}>
              {errors.name}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label htmlFor="cf-email" style={labelStyle}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            ref={emailRef}
            placeholder="you@company.com"
            className="field"
            style={{ ...fieldStyle, minHeight: 52 }}
          />
          {errors.email && (
            <span role="alert" style={errStyle}>
              {errors.email}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label htmlFor="cf-message" style={labelStyle}>
            How can I help you?
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={4}
            ref={msgRef}
            placeholder="A few lines about your project"
            className="field"
            style={{ ...fieldStyle, lineHeight: 1.6, resize: 'vertical' }}
          />
          {errors.message && (
            <span role="alert" style={errStyle}>
              {errors.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={sending}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            minHeight: 54,
            padding: '15px 26px',
            borderRadius: 18,
            background: 'linear-gradient(180deg,#191A2B,#0D0E16)',
            border: '1px solid rgba(121,210,8,.5)',
            color: '#F2F3F7',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 0 26px -10px rgba(121,210,8,.65)',
          }}
        >
          {submitLabel} <span aria-hidden="true">→</span>
        </button>

        {sent && (
          <p
            role="status"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              margin: 0,
              padding: '14px 16px',
              borderRadius: 16,
              background: 'rgba(121,210,8,.1)',
              border: '1px solid rgba(121,210,8,.3)',
              fontSize: 13,
              color: '#C4F291',
            }}
          >
            <span aria-hidden="true">✓</span> Thanks — your message is queued.
            I&apos;ll reply within two working days.
          </p>
        )}
      </form>
    </section>
  );
}
