type CastMember = {
  name: string,
  character: string
}

type CrewMember = {
  name: string,
  job: string
}

export type MovieCredits = {
  cast: CastMember[],
  crew: CrewMember[]
}
