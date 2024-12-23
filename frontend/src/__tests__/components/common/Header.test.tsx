import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/common/Header";
import { useChainStore } from "@/hooks/useChainStore";

// Mock the zustand store
jest.mock("@/hooks/useChainStore", () => ({
  useChainStore: jest.fn()
}));

describe("Header", () => {
  const mockSetSelectedChain = jest.fn();

  beforeEach(() => {
    (useChainStore as jest.Mock).mockImplementation(() => ({
      selectedChain: "ethereum",
      setSelectedChain: mockSetSelectedChain
    }));
  });

  it("renders the header title", () => {
    render(<Header />);
    expect(screen.getByText("DeFi Dashboard")).toBeInTheDocument();
  });

  it("changes chain when selector is changed", () => {
    render(<Header />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "polygon" } });
    expect(mockSetSelectedChain).toHaveBeenCalledWith("polygon");
  });
});
