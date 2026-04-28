# Quote Catalog V2 Import Guide

## Use This CSV

Import this file into Zoho Creator:

- [quote-catalog-v2-schema.csv](C:\Users\Owner\Music\Acs%20System\quote-catalog-v2-schema.csv)

## Create Or Rebuild The Form With These Field Types

- `Catalog Item ID` = `Single Line`
- `Item Name` = `Single Line`
- `Service Type` = `Drop Down`
- `Item Category` = `Drop Down`
- `Description` = `Multi Line`
- `Base Price` = `Currency`
- `Unit Type` = `Drop Down`
- `Default Qty` = `Number`
- `Active` = `Yes/No`
- `Upsell` = `Yes/No`
- `Sort Order` = `Number`

## Recommended Dropdown Values

### Service Type
- `House Wash`
- `Roof Cleaning`
- `Window Cleaning`
- `Gutter Cleaning`
- `Pressure Washing`
- `Commercial Cleaning`
- `Other`

### Item Category
- `Core`
- `Add-On`
- `Upsell`
- `Material`
- `Labor`
- `Discount`

### Unit Type
- `Each`
- `Hour`
- `Sq Ft`
- `Linear Ft`
- `Job`
- `Visit`

## Import Notes

1. Create the form first with the field types above.
2. Make sure the dropdown choices already exist before importing.
3. Import the CSV file into the form.
4. Confirm `Active` and `Upsell` map correctly as yes/no values.
5. Start by testing with the sample rows before loading your full catalog.

## Recommended Next Step After Import

Once the import works, update the quote automation to:

1. match `Quotes.Service Type` to `Quote Catalog.Service Type`
2. only pull rows where `Active = true`
3. auto-add `Item Category = Core`
4. optionally suggest `Upsell = true` items separately
