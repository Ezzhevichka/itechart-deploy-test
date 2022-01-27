import React, { useState } from 'react';
import { data } from './data';
import { getRest } from './func'

export default function Questions() {
    const [value, setValue] = useState(0);
    const [rest, setRest] = useState(0);
    return (
        <section>
            {
                data.map(ind => {
                    return (
                        <div key={ind.id}>
                            <h2 id={ind.id}>{ind.id}. {ind.title}</h2>
                            <h3>{ind.total === undefined ? 11 : ind.total}</h3>
                            {ind.cases.map(k => {
                                return (
                                    <div id={ind.id}>
                                        <ul key={k.category}>
                                            <li>{k.question}</li>
                                            <input type="number" max="11" min="0" onChange={(event) => {
                                                setValue(event.target.value > 11 ? event.target.value = k.points = 11 : k.points = +event.target.value);
                                                setRest(getRest(ind));
                                            }} />
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })
            }
        </section>
    )
};
