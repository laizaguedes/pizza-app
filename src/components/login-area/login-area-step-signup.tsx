"use client"

import { useAuth } from "@/stores/auth";
import { useState } from "react";
import z from "zod";
import { CustomInput } from "../layout/custom-input";
import { Button } from "../ui/button";
import { api } from "@/lib/axios";

const schema = z.object({
    name: z.string().min(2, { message: "Nome muito curto" }),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(6, { message: "Senha muito curta" }),
    passwordConfirm: z.string().min(1, { message: "Senha inválida" }),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não coincidem",
    path: ["passwordConfirm"], // aponta o erro para o campo certo
});

type Props = {
    email: string;
}

export const LoginAreaSignup = ({ email }: Props) => {
    const auth = useAuth();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>(null);

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState(email);
    const [passwordField, setPasswordField] = useState('');
    const [passwordConfirmField, setPasswordConfirmField] = useState('');

    const handleButton = async () => {
        setErrors(null);
        const validData = schema.safeParse({
            name: nameField,
            email: emailField,
            password: passwordField,
            passwordConfirm: passwordConfirmField
        })

        if (!validData.success) {
            setErrors(validData.error.flatten().fieldErrors)
            return false;
        }

        try {
            setLoading(true);
            const signup = await api.post('/auth/signup', {
                name: validData.data.name,
                email: validData.data.email,
                password: validData.data.password
            });
            setLoading(false);

            if (!signup.data.token) {
                alert(signup.data.error);
            } else {
                auth.setToken(signup.data.token);
                auth.setOpen(false);
            }

        } catch (erro) {
            setLoading(false);
        }
    }

    return (
        <>
            <div>
                <p className="mb-2">Digite seu nome</p>
                <CustomInput
                    name="name"
                    errors={errors}
                    disabled={loading}
                    type="text"
                    value={nameField}
                    onChange={e => setNameField(e.target.value)}
                    autoFocus
                />
            </div>

            <div>
                <p className="mb-2">Digite seu E-mail</p>
                <CustomInput
                    name="email"
                    errors={errors}
                    disabled={loading}
                    type="email"
                    value={emailField}
                    onChange={e => setEmailField(e.target.value)}
                />
            </div>

            <div>
                <p className="mb-2">Digite sua Senha</p>
                <CustomInput
                    name="password"
                    errors={errors}
                    disabled={loading}
                    type="password"
                    value={passwordField}
                    onChange={e => setPasswordField(e.target.value)}
                />
            </div>

            <div>
                <p className="mb-2">Confirme sua Senha</p>
                <CustomInput
                    name="passwordConfirm"
                    errors={errors}
                    disabled={loading}
                    type="password"
                    value={passwordConfirmField}
                    onChange={e => setPasswordConfirmField(e.target.value)}
                />
            </div>

            <Button
                disabled={loading}
                onClick={handleButton}
            >Continuar</Button>
        </>
    )
}