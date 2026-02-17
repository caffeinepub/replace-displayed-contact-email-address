# Custom Domain Connection Instructions

## Primary Domain: dqmcomputer.com

Follow these steps to connect your custom domain to this Internet Computer application:

### Step 1: Verify Domain Ownership
1. Ensure the domain `dqmcomputer.com` is listed in the file `frontend/public/.well-known/ic-domains`
2. This file has already been created and deployed with your application

### Step 2: Configure DNS Records
Add the following DNS records in your domain registrar's control panel:

**For root domain (dqmcomputer.com):**
- Type: `CNAME`
- Name: `@` or leave blank (depending on your registrar)
- Value: `icp1.io`
- TTL: `3600` (or your registrar's default)

**For www subdomain (www.dqmcomputer.com):**
- Type: `CNAME`
- Name: `www`
- Value: `icp1.io`
- TTL: `3600`

**Note:** Some registrars don't allow CNAME records for root domains. In that case, use:
- Type: `A`
- Name: `@`
- Value: `147.75.83.255`

### Step 3: Wait for DNS Propagation
- DNS changes can take 1-48 hours to propagate globally
- You can check propagation status at: https://dnschecker.org

### Step 4: Verify Connection
Once DNS has propagated, your application will be accessible at:
- https://dqmcomputer.com
- https://www.dqmcomputer.com

### Alternative Access
Your application is also accessible via the Internet Computer URL:
- Check your deployment output for the IC-provided URL (format: `https://[canister-id].icp0.io`)

### Troubleshooting
If your domain doesn't connect after 48 hours:
1. Verify DNS records are correctly configured
2. Ensure `dqmcomputer.com` is listed in `.well-known/ic-domains`
3. Clear your browser cache
4. Try accessing from an incognito/private window

For more information, visit: https://internetcomputer.org/docs/current/developer-docs/web-apps/custom-domains/
