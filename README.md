# survey

> dynamic forms

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


https://github.com/miaolz123/vue-markdown

The form description & tooltip fields can use markdown syntax


## Form Configuration

The forms are configured with a JSON file. Here is the structure and property definitions:

Main structure is one object describing the form. When all the fields have been completed, there is a single submit to one endpoint. 

	`"title" : String, // displays as a heading on top of the form
	"description" : String, // (optional, MD) displays as a paragraph at the start of the form. Can be used for instructions
	"id" : String, // is sent with the request to uniquely identify this form
	"version" : String // (optional) to further identify the form
	"submit" : String (URL), // this is the endpoint that the form data will be sposted to
	"submitButton" : String, // this is the text on the submit button
	"pages" : Array, // Pages are like sections and help to divide a form into multiple parts. All the pages submit as one, so each field must be unique across all pages.`

Pages is an array with each member having these properties

	`"title" : String,  // heading at the start of each page/section
	"description" : String, //  (optional, MD) descrption paragraph at the start of each page/section
	"fields" : Array`

Fields are a list of all the form fields in the page. They are displayed in the order they appear. There are different types of fields, each uses a different component. Their properties are:

# Text Input
`{
	"type" : "text",
	"model" : "first_name", // this maps to the reactive data object
	"label" : "First Name", // (optional) string shown as the field label
	"placeholder" : "First Name", // (optional) string shown as the placeholder
	"tooltip" : "", // (optional, MD) string shown as a tooltip on hover
	"required" : true, // specifies if this field is required to complete the form
	"validation" : "notEmpty" // (optional) the type of field validator this uses,
	"conditional" : "" // optional
}`

# Number Input
`{
	"type" : "number",
	"model" : "age", // this maps to the reactive data object 
	"label" : "Age", // (optional) string shown as the field label
	"placeholder" : "", // (optional) string shown as the placeholder
	"tooltip" : "", // (optional, MD) string shown as a tooltip on hover
	"required" : true, // specifies if this field is required to complete the form
	"validation" : "", // (optional) the type of field validator this uses
	"min" : 1, // (optional) can have  min & max values
	"max" : 99,
	"conditional" : "" // optional
}`

# Select
`{
	"type" : "select",
	"model" : "marital_status",
	"label" : "Marital Status",
	"placeholder" : "Select One",
	"tooltip" : "",
	"required" : true,
	"conditional" : "" // optional,
	"options" : [  // options array
		{
			"value" : "Single",
			"label" : "Single",
			"default": true
		},
		{
			"value" : "Married",
			"label" : "Married",
			"default": false
		}
	]
}`

# Checkbox
`{
	"type" : "checkbox",
	"model" : "veteran",
	"value" : "veteran",  // this is the value that will be sent.
	"label" : "Military Veteran",
	"tooltip" : "",
	"required" : false,
	"conditional" : "" // optional
}`


# Checkbox group
Linked checkboxes. The data sent will be an array of the checked values.
`{
	"type" : "checkboxgroup",
	"model" : "hobbies",
	"label" : "Hobbies",
	"tooltip" : "",
	"required" : false,
	"conditional" : "" // optional,
	"options": [
		{
			"value" : "camping",
			"label" : "Camping",
			"checked": false
		},
		{
			"value" : "Horseback Riding",
			"label" : "Horseback Riding",
			"checked": false
		},
		{
			"value" : "Fishing",
			"label" : "Fishing",
			"checked": false
		}


	]
}`

# Radio
Will always send this data for the selected item. Only one option should be set as the default
`{
	"type" : "radio",
	"model" : "gender",
	"label" : "Gender",
	"tooltip" : "",
	"required" : true,
	"conditional" : "" // optional,
	"options" : [
		{
			"value" : "male",
			"label" : "Male",
			"default": false
		},
		{
			"value" : "female",
			"label" : "Female",
			"default": false
		},
		{
			"value" : "decline",
			"label" : "Decline to say",
			"default": true
		}		
	]
}`

# Textarea
`{
	"type" : "textarea",
	"model" : "profile",
	"label" : "Profile",
	"placeholder" : "Tell us about yourself.",
	"tooltip" : "",
	"required" : true,
	"validation" : "",
	"minLength" : 20, 
	"maxLength" : 200,
	"conditional" : "" // optional

}`

# Conditional Field
Enter a model in the conditional property , one of these oeprators (=, !=, >, <) and a value.
All field types can be conditional
`{
	"type" : "text",
	"model" : "reason", // this maps to the reactive data object
	"conditional" : "hasReason = 'yes'", // the model value to test against
	"label" : "Reason", // (optional) string shown as the field label
	"placeholder" : "", // (optional) string shown as the placeholder
	"tooltip" : "", // (optional, MD) string shown as a tooltip on hover
	"required" : true, // specifies if this field is required to complete the form
	"validation" : "notEmpty" // (optional) the type of field validator this uses
}`

# Subheading
This is a subheading element
`{
	"type" : "subheading",
	"value" : "Subheading",
	"conditional" : "" // optional
}`

# Paragraph
This is a basic paragraph that can provide some information
`{
	"type" : "paragraph",
	"value" : "Here is some freeform text",
	"conditional" : "" // optional
}`

# Divider
`{
	"type" : "divider"
}`