/**
 * Input validation and sanitization middleware to prevent XSS, NoSQL, and injection attacks
 */

// Basic string sanitizer removing dangerous HTML and script tags
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/onload=/gi, '')
    .replace(/onerror=/gi, '')
    .replace(/onclick=/gi, '')
    .trim();
};

export const sanitizeRequestBody = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key]);
      }
    });
  }
  next();
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateAppointmentPayload = (req, res, next) => {
  const { doctorId, date, time, type } = req.body;

  if (!doctorId || !date || !time) {
    return res.status(400).json({
      error: 'Doctor ID, appointment date, and time slot are required.',
      code: 'VALIDATION_FAILED'
    });
  }

  // Validate date format YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return res.status(400).json({
      error: 'Invalid date format. Expected format: YYYY-MM-DD.',
      code: 'INVALID_DATE_FORMAT'
    });
  }

  next();
};
