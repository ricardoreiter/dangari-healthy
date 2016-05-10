(function () {

    angular.module('dangari-healthy')
           .controller('ReportsCtrl', ReportsCtrl);
    
    function ReportsCtrl() {
        var self = this;

        self.reports = [{
            comment: 'Achei uma bosta isso daqui, que merda!',
            user: 'Gabriel Henrique Biz',
            station: 'UNIMED Blumenau',
            reportQuantity: 231
        }, {
            comment: 'Lixo, fui mal atendido nessa merda!',
            user: 'Daniel Pamplona',
            station: 'UNIMED Blumenau',
            reportQuantity: 5
        }, {
            comment: 'Entre agora em www.oloco.bisho.com e confira nossas promoções!',
            user: 'Bot1aa',
            station: 'Hospital Santa Isabel',
            reportQuantity: 32
        }, {
            comment: 'LIXO!',
            user: 'Gabriel Henrique Biz',
            station: 'Hospital Santa Isabel',
            reportQuantity: 1
        }, {
            comment: 'Só vai os noia',
            user: 'Gabriel Henrique Biz',
            station: 'Hospital Santo Antônio',
            reportQuantity: 3
        }];

        self.deleteComment = deleteComment;
        self.ignoreReport = ignoreReport;

        function deleteComment(report){
            var index = self.reports.indexOf(report);
            if (index > -1) {
                self.reports.splice(index, 1);
            }
            toastr.success("Comentário apagado com sucesso!");
        }

        function ignoreReport(report){
            var index = self.reports.indexOf(report);
            if (index > -1) {
                self.reports.splice(index, 1);
            }
            toastr.success("Denúncias sobre o comentário ignoradas!");
        };

    }

}());