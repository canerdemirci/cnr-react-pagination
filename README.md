# cnr-react-pagination

> Customizable React Pagination Component (Typescript)

[![NPM](https://img.shields.io/npm/v/cnr-react-pagination.svg)](https://www.npmjs.com/package/cnr-react-pagination) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

- CSS and Icon Customizable
- First, Previous, Next, Last buttons included.
- Page select box.
- Range and total item number infos.
- Customizable page button range.

- * react-icons library was used for the button icons.

## Install

```bash
npm install --save cnr-react-pagination
```

## Usage

```tsx
import React, { Component } from 'react'

import Pagination from 'cnr-react-pagination'
import 'cnr-react-pagination/dist/index.css'

class Example extends Component {
  render() {
    return <Pagination
        dataLength={data.length}
        dataLengthPerPage={dataLengthPerPage}
        onChange={(page) => {setCurrentPage(page)}}
      />
  }
}
```

## License

MIT © [canerdemirci](https://github.com/canerdemirci)
