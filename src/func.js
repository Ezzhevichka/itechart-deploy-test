function getSums(x) {
    let arr = [];
    const points = [];

    for (let i = 0; i < x.length; i++) {
        let sum = 0;
        arr.push(x[i].cases);
        for (let j = 0; j < x[i].cases.length; j++) {
            if (x[i].cases[j].points === undefined) {
                x[i].cases[j].points = 0;
            } else {
                sum += x[i].cases[j].points;
            }
        };

        let element = document.getElementById(x[i].id);

        if (sum > 11 || sum < 11) {
            element.scrollIntoView({ block: "center", behavior: "smooth" });
            element.style.color = "red";
        } else {
            element.style.color = "black";
        }
    };

    arr = arr.flat().sort((a, b) => a.category - b.category);

    for (let i = 1; i <= 12; i++) {
        points.push(arr.filter(el => el.category === i).map(el => el.points));
    };

    if (points.flat().reduce((a, b) => a + b) < 363 || points.flat().reduce((a, b) => a + b) > 363) {
        console.log(points.flat().reduce((a, b) => a + b))
        return null;
    } else {
        return points;
    }
};

function getData(x, y) {
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Мотивационный профиль'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '12px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Категории (баллы)'
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Баллы',
            data: [],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y}',
                y: 10,
                style: {
                    fontSize: '11px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    };
    options.series[0].data = y.map((el, i) => [y[i], x[i].reduce((a, b) => a + b)]);
    return options;
};

function getPolarData(x, y) {
    const options = {
        chart: {
            polar: true
        },

        title: {
            text: 'Круговой график'
        },

        pane: {
            startAngle: 0,
            endAngle: 360
        },

        xAxis: {
            min: 0,
            tickInterval: 30,
            max: 360,
            labels: {
                formatter: function () {
                    let label;
                    switch (this.value) {
                        case 0:
                            label = y[0];
                            break;
                        case 30:
                            label = y[1];
                            break;
                        case 60:
                            label = y[2];
                            break;
                        case 90:
                            label = y[3];
                            break;
                        case 120:
                            label = y[4];
                            break;
                        case 150:
                            label = y[5];
                            break;
                        case 180:
                            label = y[6];
                            break;
                        case 210:
                            label = y[7];
                            break;
                        case 240:
                            label = y[8];
                            break;
                        case 270:
                            label = y[9];
                            break;
                        case 300:
                            label = y[10];
                            break;
                        case 330:
                            label = y[11];
                            break;
                        default: ;
                    }

                    return label;
                }
            }
        },

        yAxis: {
            min: 0
        },

        plotOptions: {
            series: {
                pointStart: 0,
                pointInterval: 30
            },
            column: {
                pointPadding: 0,
                groupPadding: 0
            }
        },

        series: [{
            type: 'area',
            name: 'Количество баллов',
            data: [],
        }]
    };
    options.series[0].data = x.map((el, i) => [y[i], x[i].reduce((a, b) => a + b)]);
    return options;
};

function getRest(x) {
    x.total = 11;
    let rest = x.total = x.total - x.cases.map(a => a.points).reduce((a, b) => {
        if (a === undefined && b === undefined) {
            return Number(Boolean(a)) + Number(Boolean(b));
        } else if (a === undefined) {
            return Number(Boolean(a)) + b;
        } else if (b === undefined) {
            return Number(Boolean(b)) + a;
        } else {
            return a + b;
        };
    });
    return rest;
};

export { getSums, getData, getPolarData, getRest };
