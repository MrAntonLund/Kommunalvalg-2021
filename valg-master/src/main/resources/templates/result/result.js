google.charts.load('current', {
    packages: ['corechart']
}).then(function () {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Value');

    var options = {
        title: 'Stemmefordeling',
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    getPieChartData();

    function getPieChartData() {

        fetch(baseURL + "/parties")
            .then(response => response.json())
            .then(result => {
                console.log("!!!-----FEEECTHINGGGG-----!!!")
                parties = result
                let colours = new Array(parties.length);
                for (let i = 0; i < parties.length; i++) {
                    data.addRow([parties[i].name,parties[i].votes])
                    console.log(parties[i].letter +": " + parties[i].colour)
                    colours[i] = parties[i].colour
                }
                console.log(colours)
                options.colors = colours
                chart.draw(data, options);
            });
    }
});

