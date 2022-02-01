import React, { useState, useEffect } from 'react';
import { getData, getPolarData } from './func';
import { categoryNames } from './data';
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official';

export default function Total({ points }) {
    const [options, setOptions] = useState(null);
    const [polarOptions, setPolarOptions] = useState(null);

    HighchartsMore(Highcharts);
    useEffect(() => {
        if (points) {
            setOptions(getData(points, categoryNames));
            setPolarOptions(getPolarData(points, categoryNames));
        }
    }, [points]);

    return (
        <div id="total">
            {points ?
                <div id="total_div">
                    <h2>Итоги:</h2>
                    <ol id="total_ul">
                        {categoryNames.map((el, i) => {
                            return (
                                <li>{categoryNames[i]}: {points[i].reduce((a, b) => a + b)}</li>
                            )
                        })}
                    </ol>
                    <HighchartsReact
                        allowChartUpdate={true}
                        immutable={false}
                        highcharts={Highcharts}
                        options={options}
                    />
                    <HighchartsReact
                        allowChartUpdate={true}
                        immutable={false}
                        highcharts={Highcharts}
                        options={polarOptions}
                    />
                </div> : null}
        </div>
    )
};
