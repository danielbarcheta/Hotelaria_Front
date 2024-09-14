import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import moment from 'moment';

const ReservaSummary = ({ reserva, pagamento, isFormularioValido, onConfirm }) => {
    const dataCheckIn = moment(reserva.dataCheckIn);
    const dataCheckOut = moment(reserva.dataCheckOut);
    const numDiarias = dataCheckOut.diff(dataCheckIn, 'days');
    const [isReservaConfirmada, setIsReservaConfirmada] = useState(false);
    const [isProcessandoPgto, setIsProcessandoPgto] = useState(false);
    const navigate = useNavigate(); // Usa o hook useNavigate

    const handleConfirmarReserva = () => {
        setIsProcessandoPgto(true);
        setTimeout(() => {
            setIsProcessandoPgto(false);
            setIsReservaConfirmada(true);
            onConfirm();
        }, 3000);
    };

    useEffect(() => {
        if (isReservaConfirmada) {
            navigate('/reserva-sucesso');
        }
    }, [isReservaConfirmada, navigate]); // Corrige a lista de dependências

    return (
        <div className='card card-body mt-5'>
            <h4>Sumário da Reserva</h4>
            <p>
                Nome Completo: <strong>{reserva.nomeCompletoHospede}</strong>
            </p>
            <p>
                Email: <strong>{reserva.emailHospede}</strong>
            </p>
            <p>
                Data Check-in: <strong>{moment(reserva.dataCheckIn).format('MMM Do YYYY')}</strong>
            </p>
            <p>
                Data Check-out: <strong>{moment(reserva.dataCheckOut).format('MMM Do YYYY')}</strong>
            </p>
            <p>
                Diárias: <strong>{numDiarias}</strong>
            </p>
            <p>
                Adulto<strong>{reserva.numeroAdultos > 1 ? 's' : ''} : {reserva.numeroAdultos}</strong>
            </p>
            {pagamento > 0 ? (
                <>
                    <p>
                        Pagamento Total: <strong>${pagamento}</strong>
                    </p>
                    {isFormularioValido && !isReservaConfirmada ? (
                        <Button
                            variant='success'
                            onClick={handleConfirmarReserva}
                        >
                            {isProcessandoPgto ? (
                                <>
                                    <span
                                        className='spinner-border spinner-border-sm mr-2'
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Reserva Confirmada! Redirecionando para pagamento...
                                </>
                            ) : (
                                'Confirme a reserva e prossiga para o pagamento...'
                            )}
                        </Button>
                    ) : isReservaConfirmada ? (
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='spinner-border text-primary' role='status'>
                                <span className='sr-only'>Loading</span>
                            </div>
                        </div>
                    ) : null}
                </>
            ) : (
                <p className='text-danger'>Data de check-out deve ser depois da data de check-in</p>
            )}
        </div>
    );
};

export default ReservaSummary;
