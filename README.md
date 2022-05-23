<p align="center"><img src="icon.svg"></p>

<h1 align="center">tropy-plugin-csv</h1>

Tropy plugin to import items from a CSV file, and export your items to CSV.

## Installation

Download the `.zip` file, named `tropy-plugin-csv` plus a version number, from the [latest release](https://github.com/tropy/tropy-plugin-csv/releases/latest) on GitHub. In Tropy, navigate to *Preferences… > Plugins* and click *Install Plugin* to select the downloaded ZIP file.

## Usage

### Importing

Import requires you to make a CSV file of a particular format. To see an example of the format, run the export function of this plugin, and look particularly at the column names in the first row.

The CSV file must have column names as the first row, and these names must all be property names that are present in Tropy, for example `http://purl.org/dc/elements/1.1/title` *not* just "title".

Each row in the CSV file represents an item in Tropy. The first few columns in the CSV file, until either the end of the CSV or a column with the title `https://tropy.org/v1/tropy#path` is present, are for metadata that will appear on the imported *item*.

If you wish to include a photo for your item, there must be a `https://tropy.org/v1/tropy#path` column *after* (to the right of) all of the item metadata columns, which contains the path to the photo. The path can be a URL, absolute path or relative path. If it is a relative path, this will be interpreted relative to the location of the CSV file at the time of import. Any photo metadata columns come after the path column, and finally a `https://tropy.org/v1/tropy#note` column if you wish to include notes for that photo.

If you wish to include multiple photos for an item, add more copies of the group of columns used for the first photo (beginning with `https://tropy.org/v1/tropy#path` and optionally followed by metadata columns and notes) to the end of that row in the CSV file, one copy of the group of columns per photo. You must use the same columns for all photos in an import file, even if some of the columns are blank for some photos.

#### Troubleshooting imports

Occasionally, the plugin may have issues importing from a CSV file. This might appear as an error message inside Tropy, or some information not appearing correctly. In these cases, there's a number of things you can check. If you still have problems, please let us know in the [Tropy forums](https://forums.tropy.org/) and we can help out.

- Are all the metadata properties used as column titles known by Tropy? You may need to import additional vocabularies, or check the column titles are written exactly as Tropy is expecting. Check the vocabularies known to Tropy in *Preferences > Vocabularies*. Use the URI for the desired property as your column title, for example `https://tropy.org/v1/tropy#path`, `http://purl.org/dc/elements/1.1/date`, `http://www.europeana.eu/schemas/edm/country`.
- If your CSV file has cells separated by something other than `,`, did you configure this in the *Delimiter* setting?
- If your CSV has cells that contain the character you are using for a delimiter, are those values wrapped in quotes? For example `"my field, which contains a comma"`.
- If you have multiple photos per item, did you use the same set of column names for each photo? If a column is missing for a photo, the information for that and subsequent photos may appear as the wrong metadata property.

### Exporting

To define which metadata fields are exported for items and photos, you can define custom templates. Using Tropy’s template editor (*Preferences > Templates*), create a new template with the properties of your choice. Each property will be represented as a column in the exported CSV file. Configure the desired templates for items and photos in the plugin's *Settings*.

### Working with large numbers of photos per items

The usual structure of the import and export CSV files, with all photos for an item in a single row, works well if you have a small number of photos per item, or are generating your CSV for import with a script.

If you instead want to import a single item with a large number of photos, you may prefer to create the CSV for import having one photo per row, and use the [merge items](https://docs.tropy.org/in-the-project-view/combine_photos) functionality within Tropy to combine these into one item once they are imported.

To export an item with a large number of photos to a more human-readable CSV file, use the [explode item](https://docs.tropy.org/in-the-project-view/combine_photos#explode-an-item.) functionality in Tropy to split the item into individual photos before exporting, in order to get one photo per row in the exported file.

## Plugin configuration

To configure the plugin, click its *Settings* button in *Preferences > Plugins*:

Some settings apply to both import and export:

- Choose a plugin *Name* that will show up in the *File > Import* and *File > Export* menus.
- Use the *+* icon at the far right to create new plugin instances (so you can have multiple configurations in parallel).
- The *Item template* and *Photo template* selectors lets you pick the template to be associated with items and photos on import, and the metadata fields that are exported.
- The *Delimiter* setting lets you pick what character is used to separate the fields in the import and export CSV files. This is usually `,` (comma), but some programs may generate files with other delimiters such as `;` (semicolon) or the tab character.

Some settings only apply to exporting:

- The *Export tags* checkbox lets you choose whether to include a column containing item-level tags in the exported file. If selected, this column will contain a comma-separated list of all the tags for an item.
- The *Export photo notes* and *Export photo metadata* settings let you choose what, if any, information about photos is exported. If neither are selected, no photo information is exported. If metadata is selected, columns corresponding to the *Photo template* setting (falling back to the photo template used on the first photo of the first item) will be present in the exported file for each photo on an item. If notes is selected, a column containing all the notes for a photo, delimited by ` --- ` if there are multiple notes, will appear in the exported file.
- The *Wrap all values with quotes* setting lets you choose whether all fields should be quoted. Even when this is not selected, some fields may be quoted, if they contain characters which must be escaped to generate a valid CSV file.
- The *Copy exported data to clipboard* checkbox lets you choose whether the exported data should be written to a file (when the checkbox is unchecked) or copied to the clipboard. If selected, this overrides the *Save export as* setting, which lets you choose the file name and location for the exported file before exporting.

## Feedback

Missing a feature? Please head over to the [Tropy forums](https://forums.tropy.org/) and let us know.
