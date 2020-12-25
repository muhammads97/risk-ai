import Territory from "../states/territory";

const h = 1000;
const w = 1000;
export default class USTerritories {
    constructor() {
        this.locations = {
            Alabama: {x: (w * 6.9) / 10, y: (h * 3) / 8.1},
            Arizona: {x: (w * 2.4) / 10, y: (h * 2) / 6},
            Arkansas: {x: (w * 5.85) / 10, y: (h * 2) / 6},
            California: {x: (w * 1.05) / 10, y: (h * 1.5) / 6},
            Colorado: {x: (w * 3.5) / 10, y: (h * 1.5) / 6},
            Connecticut: {x: (w * 8.85) / 10, y: (h * 0.8) / 6},
            Delaware: {x: (w * 8.58) / 10, y: (h * 1.2) / 6},
            Florida: {x: (w * 8) / 10, y: (h * 2.65) / 6},
            Georgia: {x: (w * 7.55) / 10, y: (h * 2.13) / 6},
            Idaho: {x: (w * 2.15) / 10, y: (h * 0.77) / 6},
            Illinois: {x: (w * 6.25) / 10, y: (h * 1.3) / 6},
            Indiana: {x: (w * 6.8) / 10, y: (h * 1.25) / 6},
            Iowa: {x: (w * 5.5) / 10, y: (h * 1.3) / 6},
            Kansas: {x: (w * 4.5) / 10, y: (h * 1.68) / 6},
            Kentucky: {x: (w * 7.2) / 10, y: (h * 1.53) / 6},
            Louisiana: {x: (w * 5.85) / 10, y: (h * 2.45) / 6},
            Maine: {x: (w * 9) / 10, y: (h * 0.3) / 6},
            Maryland: {x: (w * 8.35) / 10, y: (h * 1.2) / 6},
            Massachusetts: {x: (w * 9.05) / 10, y: (h * 0.63) / 6},
            Michigan: {x: (w * 6.85) / 10, y: (h * 0.85) / 6},
            Minnesota: {x: (w * 5.3) / 10, y: (h * 0.6) / 6},
            Mississippi: {x: (w * 6.4) / 10, y: (h * 2.24) / 6},
            Missouri: {x: (w * 5.75) / 10, y: (h * 1.55) / 6},
            Montana: {x: (w * 3.05) / 10, y: (h * 0.44) / 6},
            Nebraska: {x: (w * 4.45) / 10, y: (h * 1.19) / 6},
            Nevada: {x: (w * 1.65) / 10, y: (h * 1.28) / 6},
            New_Hampshire: {x: (w * 8.85) / 10, y: (h * 0.45) / 6},
            New_Jersey: {x: (w * 8.7) / 10, y: (h * 1.05) / 6},
            New_Mexico: {x: (w * 3.4) / 10, y: (h * 2.08) / 6},
            New_York: {x: (w * 8.4) / 10, y: (h * 0.6) / 6},
            North_Carolina: {x: (w * 7.85) / 10, y: (h * 1.75) / 6},
            North_Dakota: {x: (w * 4.2) / 10, y: (h * 0.55) / 6},
            Ohio: {x: (w * 7.3) / 10, y: (h * 1.16) / 6},
            Oklahoma: {x: (w * 4.92) / 10, y: (h * 1.96) / 6},
            Oregon: {x: (w * 1.26) / 10, y: (h * 0.62) / 6},
            Pennsylvania: {x: (w * 8.2) / 10, y: (h) / 6},
            Rhode_Island: {x: (w * 9.05) / 10, y: (h * 0.76) / 6},
            South_Carolina: {x: (w * 7.7) / 10, y: (h * 1.95) / 6},
            South_Dakota: {x: (w * 4.25) / 10, y: (h * 0.9) / 6},
            Tennessee: {x: (w * 6.65) / 10, y: (h * 1.9) / 6},
            Texas: {x: (w * 4.44) / 10, y: (h * 2.62) / 6},
            Utah: {x: (w * 2.54) / 10, y: (h * 1.62) / 6},
            Vermont: {x: (w * 8.65) / 10, y: (h * 0.53) / 6},
            Virginia: {x: (w * 8) / 10, y: (h * 1.54) / 6},
            Washington: {x: (w * 1.28) / 10, y: (h * 0.32) / 6},
            West_Virginia: {x: (w * 7.65) / 10, y: (h * 1.53) / 6},
            Wisconsin: {x: (w * 6.05) / 10, y: (h * 0.95) / 6},
            Wyoming: {x: (w * 3.05) / 10, y: (h * 1.08) / 6},
        };


        let Alabama = new Territory("Alabama");
        let Arizona = new Territory("Arizona");
        let Arkansas = new Territory("Arkansas");
        let California = new Territory("California");
        let Colorado = new Territory("Colorado");
        let Connecticut = new Territory("Connecticut");
        let Delaware = new Territory("Delaware");
        let Florida = new Territory("Florida");
        let Georgia = new Territory("Georgia");
        let Idaho = new Territory("Idaho");
        let Illinois = new Territory("Illinois");
        let Indiana = new Territory("Indiana");
        let Iowa = new Territory("Iowa");
        let Kansas = new Territory("Kansas");
        let Kentucky = new Territory("Kentucky");
        let Louisiana = new Territory("Louisiana");
        let Maine = new Territory("Maine");
        let Maryland = new Territory("Maryland");
        let Massachusetts = new Territory("Massachusetts");
        let Michigan = new Territory("Michigan");
        let Minnesota = new Territory("Minnesota");
        let Mississippi = new Territory("Mississippi");
        let Missouri = new Territory("Missouri");
        let Montana = new Territory("Montana");
        let Nebraska = new Territory("Nebraska");
        let Nevada = new Territory("Nevada");
        let New_Hampshire = new Territory("New_Hampshire");
        let New_Jersey = new Territory("New_Jersey");
        let New_Mexico = new Territory("New_Mexico");
        let New_York = new Territory("New_York");
        let North_Carolina = new Territory("North_Carolina");
        let North_Dakota = new Territory("North_Dakota");
        let Ohio = new Territory("Ohio");
        let Oklahoma = new Territory("Oklahoma");
        let Oregon = new Territory("Oregon");
        let Pennsylvania = new Territory("Pennsylvania");
        let Rhode_Island = new Territory("Rhode_Island");
        let South_Carolina = new Territory("South_Carolina");
        let South_Dakota = new Territory("South_Dakota");
        let Tennessee = new Territory("Tennessee");
        let Texas = new Territory("Texas");
        let Utah = new Territory("Utah");
        let Vermont = new Territory("Vermont");
        let Virginia = new Territory("Virginia");
        let Washington = new Territory("Washington");
        let West_Virginia = new Territory("West_Virginia");
        let Wisconsin = new Territory("Wisconsin");
        let Wyoming = new Territory("Wyoming");

        // alexandria.addAdjTerritory(beheira);
        Alabama.addAdjTerritory(Florida);
        Alabama.addAdjTerritory(Georgia);
        Alabama.addAdjTerritory(Mississippi);
        Alabama.addAdjTerritory(Tennessee);
        Arizona.addAdjTerritory(California);
        Arizona.addAdjTerritory(Colorado);
        Arizona.addAdjTerritory(Nevada);
        Arizona.addAdjTerritory(New_Mexico);
        Arizona.addAdjTerritory(Utah);
        Arkansas.addAdjTerritory(Louisiana);
        Arkansas.addAdjTerritory(Mississippi);
        Arkansas.addAdjTerritory(Missouri);
        Arkansas.addAdjTerritory(Oklahoma);
        Arkansas.addAdjTerritory(Tennessee);
        Arkansas.addAdjTerritory(Texas);
        California.addAdjTerritory(Arizona);
        Colorado.addAdjTerritory(Arizona);
        Colorado.addAdjTerritory(Kansas);
        Colorado.addAdjTerritory(Nebraska);
        Colorado.addAdjTerritory(New_Mexico);
        Colorado.addAdjTerritory(Oklahoma);
        Colorado.addAdjTerritory(Utah);
        Colorado.addAdjTerritory(Wyoming);
        Connecticut.addAdjTerritory(Massachusetts);
        Connecticut.addAdjTerritory(New_York);
        Connecticut.addAdjTerritory(Rhode_Island);
        Delaware.addAdjTerritory(Maryland);
        Delaware.addAdjTerritory(New_Jersey);
        Delaware.addAdjTerritory(Pennsylvania);
        Florida.addAdjTerritory(Alabama);
        Florida.addAdjTerritory(Georgia);
        Georgia.addAdjTerritory(Alabama);
        Georgia.addAdjTerritory(Florida);
        Georgia.addAdjTerritory(North_Carolina);
        Georgia.addAdjTerritory(South_Carolina);
        Georgia.addAdjTerritory(Tennessee);
        Idaho.addAdjTerritory(Montana);
        Idaho.addAdjTerritory(Nevada);
        Idaho.addAdjTerritory(Oregon);
        Idaho.addAdjTerritory(Utah);
        Idaho.addAdjTerritory(Washington);
        Idaho.addAdjTerritory(Wyoming);
        Illinois.addAdjTerritory(Indiana);
        Illinois.addAdjTerritory(Iowa);
        Illinois.addAdjTerritory(Michigan);
        Illinois.addAdjTerritory(Kentucky);
        Illinois.addAdjTerritory(Missouri);
        Illinois.addAdjTerritory(Wisconsin);
        Indiana.addAdjTerritory(Illinois);
        Indiana.addAdjTerritory(Kentucky);
        Indiana.addAdjTerritory(Michigan);
        Indiana.addAdjTerritory(Ohio);
        Iowa.addAdjTerritory(Illinois);
        Iowa.addAdjTerritory(Minnesota);
        Iowa.addAdjTerritory(Missouri);
        Iowa.addAdjTerritory(Nebraska);
        Iowa.addAdjTerritory(South_Dakota);
        Iowa.addAdjTerritory(Wisconsin);
        Kansas.addAdjTerritory(Colorado);
        Kansas.addAdjTerritory(Missouri);
        Kansas.addAdjTerritory(Nebraska);
        Kansas.addAdjTerritory(Oklahoma);
        Kentucky.addAdjTerritory(Illinois);
        Kentucky.addAdjTerritory(Indiana);
        Kentucky.addAdjTerritory(Missouri);
        Kentucky.addAdjTerritory(Ohio);
        Kentucky.addAdjTerritory(Tennessee);
        Kentucky.addAdjTerritory(Virginia);
        Kentucky.addAdjTerritory(West_Virginia);
        Louisiana.addAdjTerritory(Arkansas);
        Louisiana.addAdjTerritory(Mississippi);
        Louisiana.addAdjTerritory(Texas);
        Maine.addAdjTerritory(New_Hampshire);
        Maryland.addAdjTerritory(Delaware);
        Maryland.addAdjTerritory(Pennsylvania);
        Maryland.addAdjTerritory(Virginia);
        Maryland.addAdjTerritory(West_Virginia);
        Massachusetts.addAdjTerritory(Connecticut);
        Massachusetts.addAdjTerritory(New_Hampshire);
        Massachusetts.addAdjTerritory(New_York);
        Massachusetts.addAdjTerritory(Rhode_Island);
        Massachusetts.addAdjTerritory(Vermont);
        Michigan.addAdjTerritory(Illinois);
        Michigan.addAdjTerritory(Indiana);
        Michigan.addAdjTerritory(Minnesota);
        Michigan.addAdjTerritory(Ohio);
        Michigan.addAdjTerritory(Wisconsin);
        Minnesota.addAdjTerritory(Iowa);
        Minnesota.addAdjTerritory(Michigan);
        Minnesota.addAdjTerritory(North_Dakota);
        Minnesota.addAdjTerritory(South_Dakota);
        Minnesota.addAdjTerritory(Wisconsin);
        Minnesota.addAdjTerritory(Wisconsin);
        Mississippi.addAdjTerritory(Alabama);
        Mississippi.addAdjTerritory(Arkansas);
        Mississippi.addAdjTerritory(Louisiana);
        Mississippi.addAdjTerritory(Tennessee);
        Missouri.addAdjTerritory(Arkansas);
        Missouri.addAdjTerritory(Illinois);
        Missouri.addAdjTerritory(Iowa);
        Missouri.addAdjTerritory(Kansas);
        Missouri.addAdjTerritory(Kentucky);
        Missouri.addAdjTerritory(Nebraska);
        Missouri.addAdjTerritory(Oklahoma);
        Missouri.addAdjTerritory(Tennessee);
        Montana.addAdjTerritory(Idaho);
        Montana.addAdjTerritory(North_Dakota);
        Montana.addAdjTerritory(South_Dakota);
        Montana.addAdjTerritory(Wyoming);
        Nebraska.addAdjTerritory(Colorado);
        Nebraska.addAdjTerritory(Iowa);
        Nebraska.addAdjTerritory(Kansas);
        Nebraska.addAdjTerritory(Missouri);
        Nebraska.addAdjTerritory(South_Dakota);
        Nebraska.addAdjTerritory(Wyoming);
        Nevada.addAdjTerritory(Arizona);
        Nevada.addAdjTerritory(California);
        Nevada.addAdjTerritory(Idaho);
        Nevada.addAdjTerritory(Oregon);
        Nevada.addAdjTerritory(Utah);
        New_Hampshire.addAdjTerritory(Maine);
        New_Hampshire.addAdjTerritory(Massachusetts);
        New_Hampshire.addAdjTerritory(Vermont);
        New_Jersey.addAdjTerritory(Delaware);
        New_Jersey.addAdjTerritory(New_York);
        New_Jersey.addAdjTerritory(Pennsylvania);
        New_Mexico.addAdjTerritory(Arizona);
        New_Mexico.addAdjTerritory(Colorado);
        New_Mexico.addAdjTerritory(Oklahoma);
        New_Mexico.addAdjTerritory(Texas);
        New_Mexico.addAdjTerritory(Utah);
        New_York.addAdjTerritory(Connecticut);
        New_York.addAdjTerritory(Massachusetts);
        New_York.addAdjTerritory(New_Jersey);
        New_York.addAdjTerritory(Pennsylvania);
        New_York.addAdjTerritory(Rhode_Island);
        New_York.addAdjTerritory(Vermont);
        North_Carolina.addAdjTerritory(Georgia);
        North_Carolina.addAdjTerritory(South_Carolina);
        North_Carolina.addAdjTerritory(Tennessee);
        North_Carolina.addAdjTerritory(Virginia);
        North_Dakota.addAdjTerritory(Minnesota);
        North_Dakota.addAdjTerritory(Montana);
        North_Dakota.addAdjTerritory(South_Dakota);
        Ohio.addAdjTerritory(Indiana);
        Ohio.addAdjTerritory(Kentucky);
        Ohio.addAdjTerritory(Michigan);
        Ohio.addAdjTerritory(Pennsylvania);
        Ohio.addAdjTerritory(West_Virginia);
        Oklahoma.addAdjTerritory(Arkansas);
        Oklahoma.addAdjTerritory(Colorado);
        Oklahoma.addAdjTerritory(Kansas);
        Oklahoma.addAdjTerritory(New_Mexico);
        Oklahoma.addAdjTerritory(Texas);
        Oregon.addAdjTerritory(California);
        Oregon.addAdjTerritory(Idaho);
        Oregon.addAdjTerritory(Nevada);
        Oregon.addAdjTerritory(Washington);
        Pennsylvania.addAdjTerritory(Delaware);
        Pennsylvania.addAdjTerritory(Maryland);
        Pennsylvania.addAdjTerritory(New_Jersey);
        Pennsylvania.addAdjTerritory(New_York);
        Pennsylvania.addAdjTerritory(Ohio);
        Pennsylvania.addAdjTerritory(West_Virginia);
        Rhode_Island.addAdjTerritory(Connecticut);
        Rhode_Island.addAdjTerritory(Massachusetts);
        Rhode_Island.addAdjTerritory(New_York);
        South_Carolina.addAdjTerritory(Georgia);
        South_Carolina.addAdjTerritory(North_Carolina);
        South_Dakota.addAdjTerritory(Iowa);
        South_Dakota.addAdjTerritory(Minnesota);
        South_Dakota.addAdjTerritory(Montana);
        South_Dakota.addAdjTerritory(Nebraska);
        South_Dakota.addAdjTerritory(North_Dakota);
        South_Dakota.addAdjTerritory(Wyoming);
        Tennessee.addAdjTerritory(Alabama);
        Tennessee.addAdjTerritory(Arkansas);
        Tennessee.addAdjTerritory(Georgia);
        Tennessee.addAdjTerritory(Kentucky);
        Tennessee.addAdjTerritory(Mississippi);
        Tennessee.addAdjTerritory(Missouri);
        Tennessee.addAdjTerritory(North_Carolina);
        Tennessee.addAdjTerritory(Virginia);
        Texas.addAdjTerritory(Arkansas);
        Texas.addAdjTerritory(Louisiana);
        Texas.addAdjTerritory(New_Mexico);
        Texas.addAdjTerritory(Oklahoma);
        Utah.addAdjTerritory(Arizona);
        Utah.addAdjTerritory(Colorado);
        Utah.addAdjTerritory(Idaho);
        Utah.addAdjTerritory(Nevada);
        Utah.addAdjTerritory(New_Mexico);
        Utah.addAdjTerritory(Wyoming);
        Vermont.addAdjTerritory(Massachusetts);
        Vermont.addAdjTerritory(New_Hampshire);
        Vermont.addAdjTerritory(New_York);
        Virginia.addAdjTerritory(Kentucky);
        Virginia.addAdjTerritory(Maryland);
        Virginia.addAdjTerritory(North_Carolina);
        Virginia.addAdjTerritory(Tennessee);
        Virginia.addAdjTerritory(West_Virginia);
        Washington.addAdjTerritory(Idaho);
        Washington.addAdjTerritory(Oregon);
        West_Virginia.addAdjTerritory(Kentucky);
        West_Virginia.addAdjTerritory(Maryland);
        West_Virginia.addAdjTerritory(Ohio);
        West_Virginia.addAdjTerritory(Pennsylvania);
        West_Virginia.addAdjTerritory(Virginia);
        Wisconsin.addAdjTerritory(Illinois);
        Wisconsin.addAdjTerritory(Iowa);
        Wisconsin.addAdjTerritory(Michigan);
        Wisconsin.addAdjTerritory(Minnesota);
        Wyoming.addAdjTerritory(Colorado);
        Wyoming.addAdjTerritory(Idaho);
        Wyoming.addAdjTerritory(Montana);
        Wyoming.addAdjTerritory(Nebraska);
        Wyoming.addAdjTerritory(South_Dakota);
        Wyoming.addAdjTerritory(Utah);

        this.territories = [
            Alabama,
            Arizona,
            Arkansas,
            California,
            Colorado,
            Connecticut,
            Delaware,
            Florida,
            Georgia,
            Idaho,
            Illinois,
            Indiana,
            Iowa,
            Kansas,
            Kentucky,
            Louisiana,
            Maine,
            Maryland,
            Massachusetts,
            Michigan,
            Minnesota,
            Mississippi,
            Missouri,
            Montana,
            Nebraska,
            Nevada,
            New_Hampshire,
            New_Jersey,
            New_Mexico,
            New_York,
            North_Carolina,
            North_Dakota,
            Ohio,
            Oklahoma,
            Oregon,
            Pennsylvania,
            Rhode_Island,
            South_Carolina,
            South_Dakota,
            Tennessee,
            Texas,
            Utah,
            Vermont,
            Virginia,
            Washington,
            West_Virginia,
            Wisconsin,
            Wyoming,
        ];
    }

    getTerritories() {
        return this.territories;
    }

    getLocations() {
        return this.locations;
    }
}