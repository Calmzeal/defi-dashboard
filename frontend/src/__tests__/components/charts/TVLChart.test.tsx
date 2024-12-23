"use client";

import { render, screen } from "@testing-library/react";
import { TVLChart } from "@/components/charts/TVLChart";
import { useProtocolData } from "@/hooks/useProtocolData";
import { useChainStore } from "@/hooks/useChainStore";

// Mock the hooks
jest.mock("@/hooks/useProtocolData");
jest.mock("@/hooks/useChainStore");

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("TVLChart", () => {
  const mockContainer = () => {
    Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
      configurable: true,
      value: () => ({
        width: 500,
        height: 300,
      }),
    });
  };

  beforeEach(() => {
    mockContainer();
    (useChainStore as jest.Mock).mockImplementation(() => ({
      selectedChain: "ethereum"
    }));
  });

  it("shows loading state", () => {
    (useProtocolData as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null
    });

    render(<TVLChart />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows error message when data fetch fails", () => {
    (useProtocolData as jest.Mock).mockReturnValue({
      isError: true,
      error: new Error("Failed to fetch"),
      data: null
    });

    render(<TVLChart />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("renders chart when data is available", () => {
    const mockData = [
      { id: "1", name: "Protocol 1", tvl: 1000000, apy: 5, chain: "ethereum" },
      { id: "2", name: "Protocol 2", tvl: 2000000, apy: 6, chain: "ethereum" }
    ];

    (useProtocolData as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false
    });

    render(<TVLChart />);
    expect(screen.getByText("TVL by Protocol")).toBeInTheDocument();
  });
});
