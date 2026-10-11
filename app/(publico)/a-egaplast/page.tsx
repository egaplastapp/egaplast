export const metadata = { title: "A EGAPLAST" };

export default function AboutPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-bold text-navy">A EGAPLAST</h1>
      <p className="mt-4 text-ink">
        Desde a fundação em 31 de maio de 1999, em Brasília, a EGAPLAST publica ter sido pioneira na
        fabricação de mecanismos de descarga para caixas acopladas. A página de história resume a
        trajetória como pioneira, especialista e referência, e usa a frase “entra na sua casa e não sai”.
      </p>
      <h2 className="mt-8 text-xl font-bold text-navy">O que a própria história conta</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink">
        <li>Anos 80/90: primeiros mecanismos, ainda antes da indústria formal.</li>
        <li>1999: abertura da indústria em Brasília.</li>
        <li>2010 em diante: mecanismo com entrada ajustável e kit castelo.</li>
        <li>2012: Dualflush de 3 ou 6 litros, com economia de água de até 60% frente ao convencional, segundo o texto publicado.</li>
        <li>Inspeção na fábrica, com testes de pressão e de ciclos. O site não nomeia o laboratório nem o certificado.</li>
      </ul>
      <h2 className="mt-8 text-xl font-bold text-navy">Missão publicada</h2>
      <p className="mt-3 text-ink">
        Oferecer, a preço justo, soluções em produtos para instalações hidrossanitárias, elétricas,
        ferramentas, reparos e acessórios, sem perder a responsabilidade por um ecossistema sustentável.
        A visão fala em comercializar no território nacional. Números de produção, de clientes e de
        logística não estão no site e não foram colocados aqui.
      </p>
      <h2 className="mt-8 text-xl font-bold text-navy">Valores publicados</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink">
        <li>Colocar a vida humana como bem supremo.</li>
        <li>Respeitar a diversidade de pensamentos.</li>
        <li>Estimular as boas práticas comerciais.</li>
        <li>Reconhecer a força do trabalho em equipe.</li>
        <li>Nortear as ações em princípios éticos.</li>
      </ul>
    </article>
  );
}
