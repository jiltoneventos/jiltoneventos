/* =========================================================
   J. ILTON EVENTOS
   Funcionalidades de interação
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");
    const contactForm = document.querySelector("#contact-form");
    const feedback = document.querySelector("#form-feedback");
    const currentYear = document.querySelector("#current-year");
    const spaceLinks = document.querySelectorAll("[data-space]");

    /*
     * Atualiza automaticamente o ano exibido no rodapé.
     */
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /*
     * Abre e fecha o menu em telas menores.
     */
    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("is-open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );
        });

        /*
         * Fecha o menu depois que o usuário toca em um item.
         */
        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navigation.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menu");
            });
        });
    }

    /*
     * Quando o usuário clica em "Tenho interesse",
     * o espaço selecionado é preenchido automaticamente no formulário.
     */
    spaceLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const selectedSpace = link.dataset.space;
            const interestField = document.querySelector("#interest");

            if (interestField && selectedSpace) {
                interestField.value = selectedSpace;
            }
        });
    });

    /*
     * Envio do formulário por WhatsApp.
     *
     * Este site é estático e não exige servidor.
     * O formulário monta uma mensagem e abre o WhatsApp.
     */
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);

            const name = formData.get("name")?.trim();
            const phone = formData.get("phone")?.trim();
            const email = formData.get("email")?.trim();
            const interest = formData.get("interest")?.trim();
            const visitDate = formData.get("visit-date")?.trim();
            const message = formData.get("message")?.trim();

            if (!name || !phone) {
                feedback.textContent =
                    "Preencha pelo menos seu nome e telefone.";
                return;
            }

            const whatsappMessage = [
                "Olá! Gostaria de solicitar informações sobre os espaços da J. Ilton Eventos.",
                "",
                `Nome: ${name}`,
                `Telefone: ${phone}`,
                `E-mail: ${email || "Não informado"}`,
                `Interesse: ${interest || "Ainda não definido"}`,
                `Melhor período para visita: ${visitDate || "Não informado"}`,
                `Mensagem: ${message || "Não informada"}`
            ].join("\n");

            const whatsappNumber = "5521991556171";
            const whatsappUrl =
                `https://wa.me/${whatsappNumber}?text=` +
                encodeURIComponent(whatsappMessage);

            feedback.textContent =
                "Abrindo o WhatsApp com sua solicitação...";

            window.open(whatsappUrl, "_blank", "noopener,noreferrer");

            contactForm.reset();
        });
    }
});