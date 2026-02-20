# Backend Context: Two-Level Authentication & Profile Update

This document summarizes recent backend changes in the `agendapsico-api` that require corresponding updates in the frontend application.

## 1. Profile Simplification
- **Removed**: `ClinicResponsibleTechnician` (RT) entity and module.
- **Added**: `crp` field directly to the `Clinic` entity (optional string).
- **Status Change**: `PENDING_RT` status for clinics has been removed. Clinics now go directly to `ACTIVE` (or `DRAFT`).

## 2. Two-Level Authentication Flow
The backend now differentiates between a user who is still finishing their setup and a user who is fully active.

### JWT Token Types
The JWT payload now contains a `type` claim:
- `onboarding`: Issued for users who haven't completed email verification, clinic creation, or profile setup.
- `access`: Issued only for users with `ACTIVE` status.

### User Status Transitions
1. `PENDING_EMAIL_VERIFICATION`: Initial state.
2. `EMAIL_VERIFIED`: After the user validates the code sent to their email.
3. `ACTIVE`: Automatically set when the user has:
   - Verified their email.
   - Created at least one clinic.
   - Completed their profile (provided a CPF).

## 3. API Changes for Frontend

### Login Response
The `/auth/login` and `/auth/register` endpoints now return different token keys based on the user's status:

**If user is NOT Active:**
```json
{
  "user": { ... },
  "onboarding_token": "eyJhbG..."
}
```

**If user IS Active:**
```json
{
  "user": { ... },
  "access_token": "eyJhbG...",
  "current_clinic": { ... },
  "clinics": [ ... ]
}
```

### Required Actions for Frontend
1. **Token Storage**: Store either `onboarding_token` or `access_token` as the bearer token.
2. **Routing Logic**:
   - If the backend returns `onboarding_token`, the frontend should navigate to the onboarding flow (Verify Email -> Create Clinic -> Complete Profile).
   - If the backend returns `access_token`, the user should go to the dashboard.
3. **Guards**: Backend routes protected with `@RequiredTokenType('access')` will return a `403 Forbidden` if reached with an `onboarding_token`.

## 4. Clinic Registration
When registering a clinic, the frontend should now optionally send the `crp` field:
- `POST /clinics`: `{ name, description, openedAt, crp? }`
- This action (along with profile completion) will trigger the automatic transition of the user to `ACTIVE` status.

### User Profile Completion
When completing the profile (`POST /users/complete-profile`), the response follows the same pattern:
- The `user` object is returned with all relations (including `psychologistProfile` if applicable).
- Either `onboarding_token` or `access_token` is returned.
- NO separate `profiles` object is returned.
