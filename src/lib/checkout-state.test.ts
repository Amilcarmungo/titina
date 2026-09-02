import assert from "node:assert/strict";
import test from "node:test";

import { hasCompletedAddress, normalizeSavedAddress } from "./checkout-state";

test("hasCompletedAddress returns true when all required fields are filled", () => {
  assert.equal(
    hasCompletedAddress({
      name: "Maria",
      phone: "923 123 456",
      street: "Rua 1",
      city: "Luanda",
      cep: "0000",
    }),
    true,
  );
});

test("hasCompletedAddress returns false when required fields are missing", () => {
  assert.equal(
    hasCompletedAddress({
      name: "Maria",
      phone: "923 123 456",
      street: "",
      city: "Luanda",
      cep: "0000",
    }),
    false,
  );
});

test("normalizeSavedAddress keeps defaults and country code fallback", () => {
  const normalized = normalizeSavedAddress({
    name: "Maria",
    phone: "923123456",
    street: "Rua 1",
    city: "Luanda",
    cep: "0000",
  });

  assert.equal(normalized.countryCode, "+244");
  assert.equal(normalized.phone, "923123456");
  assert.equal(normalized.city, "Luanda");
});
