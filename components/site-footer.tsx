import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-ink md:grid-cols-3">
        <div>
          <p className="font-semibold text-navy">EGAPLAST</p>
          <p className="mt-2">
            Egaplast - Artefatos e comércio de plásticos LTDA
            <br />
            CNPJ 03185.564/0001-34
          </p>
          <p className="mt-2">
            QS 09, Rua 122, Lote 06, Águas Claras
            <br />
            Brasília-DF, CEP 71.977-360
          </p>
        </div>
        <div>
          <p className="font-semibold text-navy">Contatos publicados no site atual</p>
          <p className="mt-2">
            Fixos: +55 61 3386-5266 e +55 61 3386-7507
            <br />
            SAC: (61) 9871-9098 · sac@egaplast.com.br
            <br />
            Comercial: comercial@egaplast.com.br
          </p>
          <p className="mt-2 text-muted">
            A home e a página de contato publicam celulares diferentes. Este protótipo não abre
            WhatsApp até a empresa indicar o número oficial.
          </p>
        </div>
        <div>
          <p className="font-semibold text-navy">Nesta demonstração</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/produtos" className="underline">
                Catálogo
              </Link>
            </li>
            <li>
              <Link href="/portal/entrar" className="underline">
                Portal de pré-pedidos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
