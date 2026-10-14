// La casilla de la newsletter: envía el correo a Brevo sin salir de morci.me y enseña el mensaje en su sitio.
// Si algo falla (sin red, Brevo no responde), deja que el formulario se envíe como siempre.
for (const form of document.querySelectorAll("form.alta")) {
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const boton = form.querySelector("button");
    boton.disabled = true;
    boton.textContent = "Enviando…";
    try {
      const r = await fetch(form.action, { method: "POST", body: new FormData(form) });
      const d = await r.json();
      if (!d.success) throw new Error(d.message || "Brevo no lo aceptó");
      const ok = document.createElement("div");
      ok.className = "alta-ok";
      ok.setAttribute("role", "status");
      ok.innerHTML = "<b>✓</b> <span></span>";
      ok.querySelector("span").textContent = d.message || "¡Apuntado! El lunes te llega el primero.";
      form.replaceWith(ok);
    } catch (e) {
      boton.disabled = false;
      boton.textContent = "Apuntarme";
      form.submit();
    }
  });
}
