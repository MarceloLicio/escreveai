const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const fadeSections = document.querySelectorAll('.section, .footer');
const textRequest = document.querySelector('#text-request');
const toneSelect = document.querySelector('#tone-select');
const generateButton = document.querySelector('#generate-button');
const generatedText = document.querySelector('#generated-text');
const resultTone = document.querySelector('#result-tone');
const formFeedback = document.querySelector('#form-feedback');

const toneInstructions = {
  formal: 'Use linguagem profissional, clara, objetiva e sem informalidades.',
  casual: 'Use linguagem leve, natural, proxima e facil de entender.',
  divertido: 'Use linguagem descontraida, criativa e bem-humorada, sem perder clareza.',
  persuasivo: 'Use linguagem convincente, focada em beneficios, desejo e chamada para acao.',
};

const toneLabels = {
  formal: 'Formal',
  casual: 'Casual',
  divertido: 'Divertido',
  persuasivo: 'Persuasivo',
};

const toneTemplates = {
  formal: (request) => `Prezados, apresentamos uma proposta objetiva sobre: ${request}. O conteudo foi estruturado para comunicar valor com clareza, credibilidade e profissionalismo. Caso faca sentido para o seu momento, entre em contato para avancarmos com os proximos passos.`,
  casual: (request) => `Vamos falar sobre ${request}? A ideia aqui e simplificar a mensagem, mostrar o principal beneficio e deixar tudo facil de entender. Se isso combina com o que voce procura, vale dar o proximo passo.`,
  divertido: (request) => `Bora tirar essa ideia do papel: ${request}. Nada de texto travado ou sem graca. A proposta e chamar atencao, explicar o beneficio e deixar o leitor com vontade de saber mais.`,
  persuasivo: (request) => `Se voce precisa de ${request}, este e o momento de agir. Uma mensagem clara, direcionada e focada no beneficio certo pode transformar interesse em decisao. Comece agora e veja a diferenca na resposta do seu publico.`,
};

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.addEventListener('click', (event) => {
  if (event.target.tagName !== 'A') {
    return;
  }

  navLinks.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
});

generateButton.addEventListener('click', () => {
  const request = textRequest.value.trim();
  const tone = toneSelect.value;
  const toneLabel = toneLabels[tone] || toneLabels.casual;
  const instruction = toneInstructions[tone] || toneInstructions.casual;

  if (!request) {
    formFeedback.textContent = 'Descreva o texto que voce quer gerar.';
    textRequest.focus();
    return;
  }

  const aiPrompt = `Gere um texto em portugues do Brasil no tom ${toneLabel}. ${instruction} Pedido do usuario: ${request}`;

  resultTone.textContent = `Tom usado: ${toneLabel}`;
  generatedText.textContent = createGeneratedText(request, toneLabel, instruction, aiPrompt);
  formFeedback.textContent = 'Texto gerado com o tom selecionado.';
});

const createGeneratedText = (request, toneLabel, instruction, aiPrompt) => {
  const normalizedTone = toneLabel.toLowerCase();
  const template = toneTemplates[normalizedTone] || toneTemplates.casual;

  return `Prompt enviado para a IA:\n${aiPrompt}\n\nTexto sugerido:\n${template(request)}\n\nDiretriz aplicada: ${instruction}`;
};

fadeSections.forEach((section) => {
  section.classList.add('fade-section');
});

const revealSection = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  threshold: 0.18,
});

fadeSections.forEach((section) => {
  sectionObserver.observe(section);
});
