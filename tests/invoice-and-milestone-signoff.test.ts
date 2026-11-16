import { describe, it, expect, beforeEach } from "vitest";
import {
  generateInvoiceForOrder,
  generateApprovalSignature,
  approveOrderMilestone,
  _resetOmsStoresForTesting,
} from "../app/lib/oms-service";
import type { CustomerRecord, OrderRecord } from "../app/lib/oms-types";

const FIXTURE_CUSTOMERS: CustomerRecord[] = [
  {
    id: "cust-test-1",
    companyName: "Example Tech Ltd",
    primaryContactName: "Test Client A",
    email: "client-a@example.com",
    clientTier: "active_client",
    ndaStatus: "signed",
    totalSpendUsd: 22500,
    createdAt: "2026-09-15T09:00:00Z",
    updatedAt: "2026-09-15T09:00:00Z",
  },
  {
    id: "cust-test-2",
    companyName: "Sample Cloud Ltd",
    primaryContactName: "Test Client B",
    email: "client-b@example.com",
    clientTier: "active_client",
    ndaStatus: "signed",
    totalSpendUsd: 15000,
    createdAt: "2026-10-01T09:00:00Z",
    updatedAt: "2026-10-01T09:00:00Z",
  },
];

const FIXTURE_ORDERS: OrderRecord[] = [
  {
    id: "ord-test-1001",
    orderNumber: "ORD-2026-1001",
    customerId: "cust-test-1",
    customer: FIXTURE_CUSTOMERS[0],
    title: "Full-Stack Web Platform Sprint",
    serviceTier: "Full-Stack Web Application",
    status: "in_progress",
    paymentStatus: "partially_paid",
    currency: "USD",
    subtotalAmount: 22500,
    taxAmount: 0,
    totalAmount: 22500,
    amountPaid: 11250,
    startDate: "2026-09-15",
    targetCompletionDate: "2026-10-30",
    clientAccessToken: "token_test_order_1001_fixture_alpha",
    milestones: [
      {
        id: "ms-test-1",
        orderId: "ord-test-1001",
        milestoneIndex: 1,
        title: "Phase 1: Kick-off & Architecture",
        deliverablesSummary: "Schema & layout",
        amount: 11250,
        dueDate: "2026-09-22",
        status: "client_approved",
        approvedAt: "2026-09-23T14:00:00Z",
        approvedBy: "Test Client A",
        createdAt: "2026-09-15T09:00:00Z",
      },
      {
        id: "ms-test-2",
        orderId: "ord-test-1001",
        milestoneIndex: 2,
        title: "Phase 2: Core Build",
        deliverablesSummary: "API & UI",
        amount: 6750,
        dueDate: "2026-10-15",
        status: "in_progress",
        createdAt: "2026-09-15T09:00:00Z",
      },
      {
        id: "ms-test-3",
        orderId: "ord-test-1001",
        milestoneIndex: 3,
        title: "Phase 3: Handover",
        deliverablesSummary: "Final deployment",
        amount: 4500,
        dueDate: "2026-10-30",
        status: "pending",
        createdAt: "2026-09-15T09:00:00Z",
      },
    ],
    createdAt: "2026-09-15T09:00:00Z",
    updatedAt: "2026-09-15T09:00:00Z",
  },
  {
    id: "ord-test-1002",
    orderNumber: "ORD-2026-1002",
    customerId: "cust-test-2",
    customer: FIXTURE_CUSTOMERS[1],
    title: "Database Indexing Sprint",
    serviceTier: "Database Optimization",
    status: "milestone_review",
    paymentStatus: "paid",
    currency: "USD",
    subtotalAmount: 15000,
    taxAmount: 0,
    totalAmount: 15000,
    amountPaid: 15000,
    startDate: "2026-10-01",
    targetCompletionDate: "2026-10-28",
    clientAccessToken: "token_test_order_1002_fixture_beta",
    milestones: [
      {
        id: "ms-b-1",
        orderId: "ord-test-1002",
        milestoneIndex: 1,
        title: "Phase 1: Query Audit",
        deliverablesSummary: "Index plan",
        amount: 7500,
        dueDate: "2026-10-12",
        status: "client_approved",
        createdAt: "2026-10-01T09:00:00Z",
      },
      {
        id: "ms-b-2",
        orderId: "ord-test-1002",
        milestoneIndex: 2,
        title: "Phase 2: Migration Rollout",
        deliverablesSummary: "Verified benchmarks",
        amount: 7500,
        dueDate: "2026-10-26",
        status: "submitted",
        createdAt: "2026-10-01T09:00:00Z",
      },
    ],
    createdAt: "2026-10-01T09:00:00Z",
    updatedAt: "2026-10-01T09:00:00Z",
  },
];

describe("Institutional Invoicing & Milestone Digital Sign-Off Engine", () => {
  beforeEach(() => {
    _resetOmsStoresForTesting(FIXTURE_ORDERS, FIXTURE_CUSTOMERS);
  });

  describe("Tax-Compliant Commercial Invoice Generator (INV-YYYY-XXXX)", () => {
    it("should generate full contract invoice matching total amounts and milestones", () => {
      const order = FIXTURE_ORDERS[0];
      const customer = FIXTURE_CUSTOMERS[0];

      const invoice = generateInvoiceForOrder(order, customer);

      expect(invoice.invoiceNumber).toBe("INV-2026-1001");
      expect(invoice.orderNumber).toBe("ORD-2026-1001");
      expect(invoice.totalAmount).toBe(22500);
      expect(invoice.subtotal).toBe(22500);
      expect(invoice.taxAmount).toBe(0);
      expect(invoice.amountPaid).toBe(11250);
      expect(invoice.balanceDue).toBe(11250);
      expect(invoice.paymentStatus).toBe("partially_paid");
      expect(invoice.lineItems).toHaveLength(3);

      expect(invoice.lineItems[0].unitPrice).toBe(11250);
      expect(invoice.lineItems[1].unitPrice).toBe(6750);
      expect(invoice.lineItems[2].unitPrice).toBe(4500);

      expect(invoice.issuer.name).toContain("Abu Hanif");
      expect(invoice.issuer.wireDetails.bankName).toBeDefined();
      expect(invoice.issuer.wireDetails.accountOrIban).toBeDefined();

      expect(invoice.customer.companyName).toBe("Example Tech Ltd");
      expect(invoice.customer.primaryContactName).toBe("Test Client A");
    });

    it("should generate single-phase invoice when milestoneIndex is specified", () => {
      const order = FIXTURE_ORDERS[0];
      const customer = FIXTURE_CUSTOMERS[0];

      const phase1Invoice = generateInvoiceForOrder(order, customer, 1);
      expect(phase1Invoice.invoiceNumber).toBe("INV-2026-1001-M1");
      expect(phase1Invoice.lineItems).toHaveLength(1);
      expect(phase1Invoice.totalAmount).toBe(11250);
      expect(phase1Invoice.lineItems[0].description).toContain("Phase 1");

      const phase2Invoice = generateInvoiceForOrder(order, customer, 2);
      expect(phase2Invoice.invoiceNumber).toBe("INV-2026-1001-M2");
      expect(phase2Invoice.totalAmount).toBe(6750);
      expect(phase2Invoice.lineItems[0].description).toContain("Phase 2");
    });

    it("should mark invoice as paid in full when amountPaid equals totalAmount", () => {
      const paidOrder = FIXTURE_ORDERS[1];
      const invoice = generateInvoiceForOrder(paidOrder, FIXTURE_CUSTOMERS[1]);

      expect(invoice.totalAmount).toBe(15000);
      expect(invoice.amountPaid).toBe(15000);
      expect(invoice.balanceDue).toBe(0);
      expect(invoice.paymentStatus).toBe("paid");
    });
  });

  describe("Cryptographic Digital Sign-Off Hash Generator", () => {
    it("should produce a deterministic sha256 signature hash", () => {
      const sig1 = generateApprovalSignature("ord-1", "ms-1", "Test Approver A", "2026-10-26T12:00:00Z");
      const sig2 = generateApprovalSignature("ord-1", "ms-1", "Test Approver A", "2026-10-26T12:00:00Z");

      expect(sig1).toMatch(/^sig_sha256_[a-f0-9]{32}$/);
      expect(sig1).toBe(sig2);
    });

    it("should change hash if approver or timestamp changes (tamper-evident)", () => {
      const sig1 = generateApprovalSignature("ord-1", "ms-1", "Test Approver A", "2026-10-26T12:00:00Z");
      const sig2 = generateApprovalSignature("ord-1", "ms-1", "Test Approver B", "2026-10-26T12:00:00Z");

      expect(sig1).not.toBe(sig2);
    });
  });

  describe("Client Milestone Approval & Deliverables Acceptance Engine", () => {
    it("should allow client to approve a milestone in 'submitted' status", async () => {
      const order = FIXTURE_ORDERS[1];
      const submittedMs = order.milestones.find((m) => m.id === "ms-b-2");
      expect(submittedMs?.status).toBe("submitted");

      const result = await approveOrderMilestone(
        order.clientAccessToken,
        "ms-b-2",
        "Test Client B",
        "Verified deliverables.",
        "198.51.100.42"
      );

      expect(result.milestone.status).toBe("client_approved");
      expect(result.milestone.approvedBy).toBe("Test Client B");
      expect(result.milestone.approvedAt).toBeDefined();
      expect(result.milestone.approvalSignatureHash).toMatch(/^sig_sha256_/);

      expect(result.order.status).toBe("completed");
      expect(result.order.completedAt).toBeDefined();
    });

    it("should reject approval if approver name is empty or whitespace", async () => {
      const order = FIXTURE_ORDERS[1];
      await expect(
        approveOrderMilestone(order.clientAccessToken, "ms-b-2", "   ")
      ).rejects.toThrow("Approver name is required");
    });

    it("should reject approval if milestone is not in 'submitted' status", async () => {
      const order = FIXTURE_ORDERS[0];
      await expect(
        approveOrderMilestone(order.clientAccessToken, "ms-test-2", "Test Client A")
      ).rejects.toThrow("must be in 'submitted' status");
    });

    it("should reject approval if access token does not match any order", async () => {
      await expect(
        approveOrderMilestone("ord_live_invalid_token_99999", "ms-b-2", "Test Client B")
      ).rejects.toThrow("Order not found or access token invalid");
    });

    it("should be idempotent when approving an already approved milestone", async () => {
      const order = FIXTURE_ORDERS[0];
      const result = await approveOrderMilestone(
        order.clientAccessToken,
        "ms-test-1",
        "Test Client A"
      );
      expect(result.milestone.status).toBe("client_approved");
    });
  });
});
