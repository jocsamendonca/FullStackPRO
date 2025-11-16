import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

function sum(n1: number, n2: number) {
  return n1 + n2;
}

function media(n1: number, n2: number) {
  const resultado = (n1 + n2) / 2;

  if (resultado >= 7) {
    return "Aprovado";
  } else {
    return "Exame";
  }
}

// Criar um bloco que agrupa varios testes relacionados
describe("First test app component", () => {
  it("should adds 5 + 2 to equal 7", () => {
    expect(sum(5, 2)).toBe(7);
  });

  it("should calculate the average and return exame", () => {
    expect(media(5, 6)).toBe("Exame");
    expect(media(7, 8)).toBe("Aprovado");
  });
});

describe("App component", () => {
  it("should render app component", () => {
    render(<App />);

    const headerTitle = screen.getByTestId("header");
    expect(headerTitle).toHaveTextContent("Sujeito Programador");
  });

  it("should heading h1 have correct text", () => {
    render(<App />);

    const headingElement = screen.getByRole("heading", { level: 1 });
    expect(headingElement).toHaveTextContent("Sujeito Programador");
    expect(headingElement).toHaveClass("titulo");
  });

  it("should change message on button click", () => {
    render(<App />);

    const buttonElement = screen.getByText("Alterar mensagem");
    fireEvent.click(buttonElement);

    screen.getByText("Estudando testes com reactjs");

    const oldMessage = screen.queryByText("Bem vindo ao projeto!");
    expect(oldMessage).not.toBeInTheDocument();
  });
});

export default {};
