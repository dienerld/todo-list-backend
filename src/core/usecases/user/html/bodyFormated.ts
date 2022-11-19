export function prettyBody (url: string) {
  const htmlMail = `
    <div style="width: 100%; height: 100%; background-color: #f5f5f5; padding: 20px;">
      <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px;">
        <h1 style="text-align: center; font-size: 2rem; color: #333;">Welcome to my API</h1>
        <p style="text-align: center; font-size: 1.5rem;
        color: #333;">Click on the button below to access the API</p>
        <p style="text-align: center; font-size: 1.5rem;
        color: #333;"><a href="${url}">Verify Email</a></p>
      </div>
      <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; text-align: center;">
        <p style="font-size: 1.5rem; color: #333;">
          This is an automatic email, please do not reply.
        </p>
      </div>
    </div>
  `;

  return htmlMail;
}
