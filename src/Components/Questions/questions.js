import React, { useState } from 'react';
import { data } from '../../data';
import { getSums, getRest } from '../../func';
import { Button, TextField, Alert, AlertTitle, Stack} from '@mui/material';
import Total from '../Total/total';

export default function Questions() {
    const [value, setValue] = useState(0);
    const [rest, setRest] = useState(0);
    const [points, setPoints] = useState(null);
    const [hasError, checkHasError] = useState(false);

    return (
        <section>
            {
                data.map(ind => {
                    return (
                        <div key={ind.id} id="question">
                            <h2 id={ind.id}>{ind.id}. {ind.title}</h2>
                            {ind.error ? 
                            <Alert severity="error" id="error">
                                <AlertTitle>Ошибка!</AlertTitle>
                                Баллы распределены неверно — <strong>пожалуйста, проверьте свои значения</strong>
                            </Alert> : null}
                            <div id="variants">
                                <h3>{ind.total === undefined ? 11 : ind.total}</h3>
                                <Stack spacing={1} id="list">
                                    {ind.cases.map(k => {
                                        return (
                                            <div key={k.category}>
                                                <span id="list_item">{k.question}</span>
                                                <TextField id="input" label="Баллы" variant="filled" min="0" max="11" type="number"
                                                    onChange={(event) => {
                                                        setValue((event.target.value > 11 ?
                                                            event.target.value = k.points = 11 :
                                                            (event.target.value < 0 ? event.target.value = k.points = 0 :
                                                                k.points = +event.target.value
                                                            )));
                                                        setRest(getRest(ind));
                                                        checkHasError(ind.error);
                                                    }}
                                                />
                                            </div>
                                        )
                                    })}
                                </Stack>
                            </div>
                        </div>
                    )
                })
            }
            <Button variant='contained' id='button' onClick={() => { setPoints(getSums(data)); checkHasError(getSums(data)) }}>Рассчитать данные</Button>
            <Total points={points} />
        </section>
    )
};
