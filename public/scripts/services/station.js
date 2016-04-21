;
(function() {

    angular.module('dangari-healthy')
        .factory('StationSvc', Station);

    function Station() {

        return {
            getAll: _getAll
        }

        function _getAll(average) {
            //Dados para teste.
            return [{
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 5
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 4.5
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 4
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 3.5
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 3
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 2.5
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 2
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 1.5
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 1
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 0.5
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 0
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 45
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 45
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 45
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 45
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 45
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 45
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 45
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 45
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 45
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 45
            }, {
                name: 'Unimed Blumenau',
                image: 'http://www.unimed.coop.br/portal/conteudo/materias/1256325918313fachada.jpg',
                address: 'Rua Rio Branco, nº 797',
                scoreAverage: 45
            }];
        }
    }

}());
