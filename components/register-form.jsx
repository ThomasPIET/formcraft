"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export function RegisterForm({ registerAction, className, ...props }) {
  const [errorMessage, setErrorMessage] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isTyping, setIsTyping] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;

    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
    setIsTyping(value.length > 0);

    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("⚠️Les mots de passe ne correspondent pas");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError("⚠️Les mots de passe ne correspondent pas");
    } else {
      setPasswordError("");
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength === 5) return "Forte";
    if (strength === 3 || strength === 4) return "Moyenne";
    return "Faible";
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Créer un compte</CardTitle>
          <CardDescription>
            Entrer vos informations pour créer un compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              const formData = new FormData(e.target);
              try {
                await registerAction(formData);
                setErrorMessage("");
              } catch (error) {
                setErrorMessage(error.message);
                setIsLoading(false);
              }
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    onChange={handlePasswordChange}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={20} />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white border p-2">
                        <p>Votre mot de passe doit contenir :</p>
                        <p>→ au moins 8 caractères</p>
                        <p>→ une majuscule</p>
                        <p>→ une minuscule</p>
                        <p>→ un chiffre</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {isTyping && passwordStrength && (
                  <p
                    className={`text-sm ${
                      passwordStrength === "Forte"
                        ? "text-green-500"
                        : passwordStrength === "Moyenne"
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  >
                    Force du mot de passe : {passwordStrength}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="Cpassword">Confirmer le mot de passe</Label>
                </div>
                <Input
                  id="Cpassword"
                  name="Cpassword"
                  type="password"
                  required
                  onChange={handleConfirmPasswordChange}
                />
                {passwordError && (
                  <p className="text-red-500 mt-2">{passwordError}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={
                  !password ||
                  !confirmPassword ||
                  password !== confirmPassword ||
                  isLoading
                }
              >
                {isLoading ? "Création du compte" : "Créer mon compte"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Vous avez déjà un compte ?{" "}
              <a href="/login" className="underline underline-offset-4">
                Connectez-vous
              </a>
            </div>
          </form>

          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
