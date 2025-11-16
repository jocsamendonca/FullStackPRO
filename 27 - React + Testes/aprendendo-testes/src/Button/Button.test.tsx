import { render, screen, fireEvent } from "@testing-library/react";
import Button from ".";

describe("Button component", () => {
  it("should call onclick prop on click", () => {
    const onClick = jest.fn();

    render(
      <Button onClick={onClick} disabled={true}>
        Meu botao
      </Button>
    );

    const button = screen.getByText("Meu botao");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("Should render with gray background if disabled", () => {
    render(
      <Button onClick={() => {}} disabled={true}>
        Meu botao
      </Button>
    );
    const button = screen.getByRole("button", { name: "Meu botao" });
    expect(button).toHaveStyle({ backgroundColor: "#FAFAFA" });
  });
});

export default {};
