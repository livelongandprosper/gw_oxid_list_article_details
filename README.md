# DHL Express deliveryset restriction (OXID eShop module)

This module checks if the delivery sets that are entered in module settings are only displayed for user if the following requirements fit:

- every article is on stock
- by module settings excluded zip codes are not used
- no abo order
- the delivery address does not point to a packing station or to a post office

## Install
- This module has to be put to the folder
\[shop root\]**/modules/gw/gw_oxid_dhlexpress_restriction/**

- You also have to create a file
\[shop root\]/modules/gw/**vendormetadata.php**

After you have done that go to shop backend and activate module.
    