# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'gonerdocs'
copyright = '2026, The Vessels'
author = 'The Vessels'
release = 'v0.0.1'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ['sphinx_rtd_theme']

templates_path = ['_templates']
exclude_patterns = []


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']
html_css_files = ['css/custom.css']
html_logo = 'img/logo.png'

# Theme options (taken from godot-docs)
html_theme_options = {
    # if we have a html_logo below, this shows /only/ the logo with no title text
    "logo_only": True,
    # Collapse navigation (False makes it tree-like)
    "collapse_navigation": False,
    # Remove version and language picker beneath the title
    "version_selector": False,
    "language_selector": False,
    # Set Flyout menu to attached
    "flyout_display": "attached",
}

html_sidebars = {
    '**': ['globaltoc.html', 'searchbox.html']
}

