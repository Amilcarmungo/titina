export type CheckoutAddressLike = {
  name?: string;
  phone?: string;
  countryCode?: string;
  street?: string;
  complement?: string;
  state?: string;
  city?: string;
  cep?: string;
  isDefault?: boolean;
};

export function normalizeSavedAddress(address: CheckoutAddressLike) {
  const rawPhone = (address.phone ?? "").trim();
  const countryCode =
    address.countryCode && address.countryCode.trim()
      ? address.countryCode.trim()
      : rawPhone.startsWith("+")
        ? rawPhone.split(" ")[0] || "+244"
        : "+244";

  const phone = rawPhone.startsWith("+")
    ? rawPhone.slice(countryCode.length).trim()
    : rawPhone;

  return {
    name: address.name ?? "",
    phone,
    countryCode,
    street: address.street ?? "",
    complement: address.complement ?? "",
    state: address.state ?? "",
    city: address.city ?? "",
    cep: address.cep ?? "",
    isDefault: Boolean(address.isDefault),
  };
}

export function hasCompletedAddress(address: CheckoutAddressLike) {
  return !!(
    address.name?.trim() &&
    address.phone?.trim() &&
    address.street?.trim() &&
    address.city?.trim() &&
    address.cep?.trim()
  );
}

export function buildAddressSummary(address: CheckoutAddressLike) {
  return [
    address.street,
    address.complement,
    address.city,
    address.state,
    "Angola",
  ]
    .filter(Boolean)
    .join(", ");
}
