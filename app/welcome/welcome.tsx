import { Button } from "react-aria-components";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

export function Welcome() {
  return (
    <main>
      <Card className="max-w-md mx-auto mt-10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Bem-vindo!</CardTitle>
          <CardDescription className="text-gray-600">Descubra as funcionalidades da nossa plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-700">Este é um card completo criado com componentes da pasta components. Ele contém cabeçalho, conteúdo e rodapé.</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Interface moderna e responsiva</li>
            <li>Componentes reutilizáveis</li>
            <li>Design system consistente</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between bg-gray-50 rounded-b-lg">
          <Button variant="outline">Saiba mais</Button>
          <Button>Começar agora</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
