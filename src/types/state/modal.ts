export interface IModal {
  visibility: boolean,
  type: string,
  settings: {
    create: {
      type: string,
      title: string,
      message: string,
      component: JSX.Element
    },
    discard: {
      type: string,
      title: string,
      message: string,
    },
    delete: {
      type: string,
      title: string,
      message: string,
    },
    search: {
      type: string,
      title: string,
      message: string
    }
  }
}
