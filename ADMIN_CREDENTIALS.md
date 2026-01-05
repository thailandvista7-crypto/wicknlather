# Admin Login Credentials

## Default Admin Account

After running the `create-admin.ts` script, you can login with the following credentials:

**Email:** `admin@wicknlather.com`  
**Password:** `admin123`

## How to Create Admin User

If you haven't created the admin user yet, run:

```bash
npx ts-node scripts/create-admin.ts
```

Or manually set these environment variables in `.env.local`:
```
ADMIN_EMAIL=admin@wicknlather.com
ADMIN_PASSWORD=admin123
```

Then run the script again.

## Important Security Notes

⚠️ **CHANGE THESE CREDENTIALS IN PRODUCTION!**

1. After first login, change the password immediately
2. Use a strong, unique password
3. Never commit credentials to version control
4. Consider using environment variables for production

## Access Admin Panel

1. Go to: `http://localhost:3000/login`
2. Enter the admin credentials above
3. You will be redirected to `/admin` dashboard automatically

## Troubleshooting

If you can't access the admin panel:
1. Make sure you've run the `create-admin.ts` script
2. Check that MongoDB is connected
3. Verify the user exists in the database with `role: 'admin'`
4. Clear browser cache and localStorage
5. Try logging out and logging back in
