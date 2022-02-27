import React, { useState, useEffect } from 'react';
import { getData, getPolarData, getRows } from '../../func';
import { categoryNames } from '../../data';
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Total({ points }) {
    const [options, setOptions] = useState(null);
    const [polarOptions, setPolarOptions] = useState(null);
    const [rows, createRows] = useState(null);

    function createData(name, sum) {
        return { name, sum };
    };

    HighchartsMore(Highcharts);
    useEffect(() => {
        if (points) {
            setOptions(getData(points, categoryNames));
            setPolarOptions(getPolarData(points, categoryNames));
            createRows(getRows(categoryNames, points, createData));
        }
    }, [points]);

    return (
        <div id="total">
            {points && rows ?
                <div id="total_div">
                    <h2>Итоговые значения</h2>
                    <TableContainer component={Paper} id="table">
                        <Table sx={{ maxWidth: 354 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Категория:</TableCell>
                                    <TableCell align="right">Сумма:</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.sum}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div id="charts">
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
                    </div>
                </div> : null}
        </div>
    )
};
