import "./Sessoes.css";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Sessoes() {

    const { idFilme } = useParams();
    const [filme, setFilme] = useState([]);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/movies/${idFilme}/showtimes`);
        promise.then((resp) => {
            setFilme(resp.data.days);
        });
    }, [idFilme]);

    return (
        <>
            <h1>Selecione o horário</h1>
            <section className="sessoes">
                {filme.map((sessao, index) => (
                    <Sessao 
                    key={index}
                    diaSemana={sessao.weekday}
                    diaMes={sessao.date}
                    horarios={sessao.showtimes}
                    id={sessao.id}
                    idFilme={idFilme}
                    />
                ))}
            </section>
            <footer>
            </footer>
        </>
    );
}

function Sessao({ diaSemana, diaMes, horarios, id, idFilme }) {
    return (
        <div key={id} className="sessao">
            <h2 className="data">{diaSemana} - {diaMes}</h2>
            <div className="horarios">
            {horarios.map((horario, index) => (
            <Horario 
            key={index}
            idSessao={horario.id}
            nome={horario.name}
            idFilme={idFilme}
            />))}
            </div>
        </div>
    );
}

function Horario({ idSessao, nome, idFilme }) {
    return (
        <Link to={`/sessoes/${idFilme}/assentos/${idSessao}`} style={{textDecoration: 'none'}}>
            <span key={idSessao} className="horario">{nome}</span>
        </Link>
    );
}