import { render, screen } from "@testing-library/react";
import { ProtocolCard } from "@/components/dashboard/ProtocolCard";

describe("ProtocolCard", () => {
  const mockProps = {
    name: "Test Protocol",
    tvl: 1234567,
    apy: 5.67,
    chain: "ethereum"
  };

  it("renders protocol information correctly", () => {
    render(<ProtocolCard {...mockProps} />);

    expect(screen.getByText("Test Protocol")).toBeInTheDocument();
    expect(screen.getByText("$1,234,567")).toBeInTheDocument();
    expect(screen.getByText("5.67%")).toBeInTheDocument();
    expect(screen.getByText("ethereum")).toBeInTheDocument();
  });

  it("formats TVL with proper number formatting", () => {
    render(<ProtocolCard {...mockProps} />);
    const tvlValue = screen.getByText("$1,234,567");
    expect(tvlValue).toBeInTheDocument();
  });
});
