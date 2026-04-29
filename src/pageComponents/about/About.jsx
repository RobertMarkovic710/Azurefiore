import "./About.css";
import { PiPawPrintFill } from "react-icons/pi";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">

        <div className="about-column">
          <h2>O nama</h2>

          <p className="highlight-box highlight-left">
            Azurefiore je <span className="highlight-text">World Cat Federation (WCF) </span>
            uzgajivačnica Ragdoll mačaka u Hrvatskoj.
          </p>

          <p>
            Posvećeni smo odgovornom i kvalitetnom uzgoju
            čistokrvnih Ragdoll mačića.
          </p>

          <p className="highlight-box highlight-left">
            Naš uzgoj se usredotočio na Blue i Lilac mačiće koji su ogojeni, uredni i naučeni na red.
            Svi naši mačići posjeduju rodovnik.
          </p>

          <p>
            Naša priča temelji se na ljubavi prema Ragdoll pasmini i želji da
            uzgajamo zdrave i socijalizirane mačke koje će biti idealni
            obiteljski ljubimci.
            Naše mačke i mačići žive i borave svaki dan s nama.
          </p>

          <p>
            Danas naša uzgajivačnica u Hrvatskoj broji tri odrasle mačke,
            dvije ženke i jednog mužjaka.
          </p>

          <p className="highlight-box highlight-left">
            Naši roditelji mačića su testirani i posjeduju negativan test na genetske bolesti HCM,
            pd-PRA i PKD.
          </p>
        </div>

        <div className="about-column">
          <h2>Zašto Ragdoll?</h2>

          <p className="highlight-box highlight-middle">
            Ragdoll mačke poznate su po svom izuzetno mirnom i privrženom karakteru, zbog čega su
            među najtraženijim pasminama mačaka.
          </p>

          <p>
            Ove prekrasne mačke imaju svilenkasto, poludugo krzno bez poddlake, te intenzivne
            plave oči koje ih čine jedinstvenima i vrlo atraktivnima.
          </p>

          <p>
            Ragdoll mačka savršeno je prilagođena životu u stanu jer voli boraviti u zatvorenom prostoru
            i uživa u stalnom kontaktu s ljudima.
          </p>

          <p>
            Njihova nježna i prijateljska osobnost čini ih idealnim izborom za obitelji s djecom, ali
            i za domove s drugim kućnim ljubimcima. Ako tražite umiljatu, odanu i prilagodljivu mačku,
            Ragdoll je jedna od najboljih opcija.
          </p>

          <p className="highlight-box highlight-middle" >
            Ako tražite Ragdoll mačiće u Osijeku ili Hrvatskoj, Azurefiore je
            uzgajivačnica koja spaja kvalitetu, iskustvo i ljubav prema životinjama.
          </p>
        </div>

        <div className="about-column">
          <h2>Naš uzgoj</h2>

          <p>
            Svi naši Ragdoll mačići nakon četrnaest tjedana dolaze potpuno spremni za novi dom, uz svu
            potrebnu dokumentaciju i zdravstvenu skrb.
          </p>

          <ul className="highlight-box highlight-right custom-list">
            <li><PiPawPrintFill /> cijepljenje protiv zaraznih bolesti i virusa</li>
            <li><PiPawPrintFill /> mikročip</li>
            <li><PiPawPrintFill /> čišćenje od parazita</li>
            <li><PiPawPrintFill /> kastracija / sterilizacija</li>
            <li><PiPawPrintFill /> rodovnik koji potvrđuje čistokrvnost</li>
            <li><PiPawPrintFill /> EU putovnica</li>
            <li><PiPawPrintFill /> Azurefiore STARTER paket</li>
            <li><PiPawPrintFill /> predugovor o rezervaciji</li>
            <li><PiPawPrintFill /> ugovor o prijepisu vlasništva</li>
          </ul>

          <p>
            Osim toga, pružamo stručne savjete o njezi, prehrani i odgoju te
            kontinuiranu podršku i nakon udomljavanja mačića.
          </p>

          <p>
            Naš cilj nije samo prodaja, već stvaranje dugoročnog odnosa i
            povjerenja s budućim, pažljivo biranim vlasnicima s kojima ostajemo u kontaktu i pružamo podršku.
          </p>
        </div>

      </div>
    </section>
  );
}