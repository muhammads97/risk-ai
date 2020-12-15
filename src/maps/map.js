import Territory from "../states/territory";

export default class MapEgypt {
  constructor() {
    let cairo = new Territory("Cairo");
    let alexandria = new Territory("Alexandria");
    let aswan = new Territory("Aswan");
    let asyut = new Territory("Asyut");
    let beheira = new Territory("Beheira");
    let beni_suef = new Territory("Beni Suef");
    let dakahlia = new Territory("Dakahlia");
    let damietta = new Territory("Damietta");
    let faiyum = new Territory("Faiyum");
    let gharbia = new Territory("Gharbia");
    let giza = new Territory("Giza");
    let ismailia = new Territory("Ismailia");
    let kafr_el_sheikh = new Territory("Kafr El Sheikh");
    let matruh = new Territory("Matruh");
    let minya = new Territory("Minya");
    let monufia = new Territory("Monufia");
    let new_valley = new Territory("New Valley");
    let north_sinai = new Territory("North Sinai");
    let port_said = new Territory("Port Said");
    let qalyubia = new Territory("Qalyubia");
    let qena = new Territory("Qena");
    let red_sea = new Territory("Red Sea");
    let sharqia = new Territory("Sharqia");
    let sohag = new Territory("Sohag");
    let south_sinai = new Territory("South Sinai");
    let suez = new Territory("Suez");
    let luxor = new Territory("Luxor");

    alexandria.addAdjTerritory(beheira);
    alexandria.addAdjTerritory(matruh);
    matruh.addAdjTerritory(giza);
    matruh.addAdjTerritory(beheira);
    matruh.addAdjTerritory(new_valley);
    beheira.addAdjTerritory(giza);
    beheira.addAdjTerritory(kafr_el_sheikh);
    beheira.addAdjTerritory(gharbia);
    beheira.addAdjTerritory(monufia);
    kafr_el_sheikh.addAdjTerritory(gharbia);
    kafr_el_sheikh.addAdjTerritory(dakahlia);
    giza.addAdjTerritory(new_valley);
    giza.addAdjTerritory(minya);
    giza.addAdjTerritory(beni_suef);
    giza.addAdjTerritory(faiyum);
    giza.addAdjTerritory(monufia);
    giza.addAdjTerritory(qalyubia);
    giza.addAdjTerritory(cairo);
    gharbia.addAdjTerritory(dakahlia);
    gharbia.addAdjTerritory(monufia);
    dakahlia.addAdjTerritory(damietta);
    dakahlia.addAdjTerritory(sharqia);
    dakahlia.addAdjTerritory(qalyubia);
    monufia.addAdjTerritory(qalyubia);
    qalyubia.addAdjTerritory(sharqia);
    qalyubia.addAdjTerritory(cairo);
    cairo.addAdjTerritory(sharqia);
    cairo.addAdjTerritory(ismailia);
    cairo.addAdjTerritory(suez);
    sharqia.addAdjTerritory(ismailia);
    ismailia.addAdjTerritory(port_said);
    ismailia.addAdjTerritory(north_sinai);
    ismailia.addAdjTerritory(suez);
    north_sinai.addAdjTerritory(suez);
    north_sinai.addAdjTerritory(south_sinai);
    suez.addAdjTerritory(south_sinai);
    suez.addAdjTerritory(red_sea);
    red_sea.addAdjTerritory(beni_suef);
    red_sea.addAdjTerritory(minya);
    red_sea.addAdjTerritory(asyut);
    red_sea.addAdjTerritory(sohag);
    red_sea.addAdjTerritory(qena);
    red_sea.addAdjTerritory(aswan);
    faiyum.addAdjTerritory(beni_suef);
    beni_suef.addAdjTerritory(minya);
    minya.addAdjTerritory(asyut);
    minya.addAdjTerritory(new_valley);
    new_valley.addAdjTerritory(asyut);
    new_valley.addAdjTerritory(sohag);
    new_valley.addAdjTerritory(qena);
    new_valley.addAdjTerritory(luxor);
    new_valley.addAdjTerritory(aswan);
    asyut.addAdjTerritory(sohag);
    sohag.addAdjTerritory(qena);
    qena.addAdjTerritory(luxor);
    qena.addAdjTerritory(aswan);

    this.territories = [
      cairo,
      alexandria,
      aswan,
      asyut,
      beheira,
      beni_suef,
      dakahlia,
      damietta,
      faiyum,
      gharbia,
      giza,
      ismailia,
      kafr_el_sheikh,
      matruh,
      minya,
      monufia,
      new_valley,
      north_sinai,
      port_said,
      qalyubia,
      qena,
      red_sea,
      sharqia,
      sohag,
      south_sinai,
      suez,
      luxor,
    ];

    this.initialArmy = 20;
  }

  getTerritories() {
    return this.territories;
  }

  getInitialArmy() {
    return this.initialArmy;
  }
}
