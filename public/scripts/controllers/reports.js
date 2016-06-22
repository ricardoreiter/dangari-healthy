(function() {

    angular.module('dangari-healthy')
        .controller('ReportsCtrl', ReportsCtrl);

    function ReportsCtrl(ReviewSvc) {
        var self = this;

        ReviewSvc.getAllWithComplaint()
            .then(
                function(response) {
                    self.reports = response;
                },
                function(error) {
                    console.error(error);
                    toastr.error("Ocorreu um erro ao buscar denúncias");
                }
            );

        self.deleteComment = deleteComment;
        self.ignoreReport = ignoreReport;

        function deleteComment(report) {
            removeReportFromList(report);
            ReviewSvc.delete(report._id);
            toastr.success("Comentário apagado com sucesso!");
        }

        function removeReportFromList(report) {
            var index = self.reports.indexOf(report);
            if (index > -1) {
                self.reports.splice(index, 1);
            }
        }

        function ignoreReport(report) {
            ReviewSvc.ignoreComplaints(report._id)
                .then(
                    function(response) {
                        removeReportFromList(report);
                        toastr.success("Denúncias sobre o comentário ignoradas!");
                    },
                    function(error) {
                        console.error(error);
                        toastr.error("Ocorreu um erro ao ignorar as denúncias");
                    }
                );
        };

    }

}());
