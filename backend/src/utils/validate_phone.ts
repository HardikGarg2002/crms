import { parsePhoneNumberFromString } from 'libphonenumber-js';

const validatePhoneNumber = (phone: string, defaultCountryCode: string = '+91'): boolean => {
  // If the phone number doesn't start with '+', prepend the default country code
  if (!phone.startsWith('+')) {
    phone = `${defaultCountryCode}${phone}`;
  }

  // Parse and validate the phone number
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber ? phoneNumber.isValid() : false;
};

export default validatePhoneNumber;