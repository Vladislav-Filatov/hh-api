interface Vacancy {
  id: string
  name: string
  experience: string
  "salary": {
    currency: string,
    from: number,
    gross: boolean,
    to: number | null
  }
  employer: {
    name: string
  }
  area: {
    id: string
    name: string
    url: string
  }
  schedule: {
    id: string
    name: string
  }
}