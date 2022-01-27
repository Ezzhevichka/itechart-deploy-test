import React, { useState, useEffect } from 'react';
import { getSums, getData, getPolarData } from './func';
import { data, categoryNames } from './data';
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official';

export default function Total() {
    const [points, setPoints] = useState(null);
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
            <button id="button" onClick={() => { setPoints(getSums(data)) }}>Get</button>
            {points ?
                <div>
                    {categoryNames.map((el, i) => {
                        return (
                            <ul>
                                <li>{categoryNames[i]}: {points[i].reduce((a, b) => a + b)}</li>
                            </ul>
                        )
                    })}
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
