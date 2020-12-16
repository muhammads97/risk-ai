import Territory from "../states/territory";

const h = 1000;
const w = 1000;
export default class EgyptTerritories {
    constructor() {
        this.locations = {
            cairo: { x: (w * 6) / 10, y: (h * 1) / 6 },
            alexandria: { x: (w * 45) / 100, y: (h * 2) / 20 },
            aswan: { x: (w * 72) / 100, y: (h * 80) / 100 },
            asyut: { x: (w * 57) / 100, y: (h * 45) / 100 },
            beheira: { x: (w * 50) / 100, y: (h * 2) / 20 },
            beni_suef: { x: (w * 50) / 100, y: (h * 28) / 100 },
            dakahlia: { x: (w * 59) / 100, y: (h * 7) / 100 },
            damietta: { x: (w * 61) / 100, y: (h * 3) / 100 },
            faiyum: { x: (w * 50) / 100, y: (h * 25) / 100 },
            gharbia: { x: (w * 55) / 100, y: (h * 8.5) / 100 },
            giza: { x: w * 0.4, y: h * 0.28 },
            ismailia: { x: w * 0.67, y: h * 0.12 },
            kafr_el_sheikh: { x: w * 0.55, y: h * 0.04 },
            matruh: { x: w * 0.25, y: h * 0.15 },
            minya: { x: w * 0.5, y: h * 0.32 },
            monufia: { x: w * 0.549, y: h * 0.12 },
            new_valley: { x: w * 0.3, y: h * 0.65 },
            north_sinai: { x: w * 0.75, y: h * 0.12 },
            port_said: { x: w * 0.67, y: h * 0.06 },
            qalyubia: { x: w * 0.568, y: h * 0.137 },
            qena: { x: (w * 70) / 100, y: (h * 55) / 100 },
            red_sea: { x: (w * 80) / 100, y: (h * 60) / 100 },
            sharqia: { x: (w * 6) / 10, y: h * 0.115 },
            sohag: { x: (w * 624) / 1000, y: (h * 52) / 100 },
            south_sinai: { x: w * 0.8, y: h * 0.3 },
            suez: { x: w * 0.65, y: h * 0.2 },
            luxor: { x: w * 0.683, y: h * 0.585 },
        };



        let cairo = new Territory("cairo");
        let alexandria = new Territory("alexandria");
        let aswan = new Territory("aswan");
        let asyut = new Territory("asyut");
        let beheira = new Territory("beheira");
        let beni_suef = new Territory("beni_suef");
        let dakahlia = new Territory("dakahlia");
        let damietta = new Territory("damietta");
        let faiyum = new Territory("faiyum");
        let gharbia = new Territory("gharbia");
        let giza = new Territory("giza");
        let ismailia = new Territory("ismailia");
        let kafr_el_sheikh = new Territory("kafr_el_sheikh");
        let matruh = new Territory("matruh");
        let minya = new Territory("minya");
        let monufia = new Territory("monufia");
        let new_valley = new Territory("new_valley");
        let north_sinai = new Territory("north_sinai");
        let port_said = new Territory("port_said");
        let qalyubia = new Territory("qalyubia");
        let qena = new Territory("qena");
        let red_sea = new Territory("red_sea");
        let sharqia = new Territory("sharqia");
        let sohag = new Territory("sohag");
        let south_sinai = new Territory("south_sinai");
        let suez = new Territory("suez");
        let luxor = new Territory("luxor");

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
        giza.addAdjTerritory(red_sea);
        giza.addAdjTerritory(suez);
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
    }
    getTerritories(){
        return this.territories;
    }

    getLocations(){
        return this.locations;
    }
}