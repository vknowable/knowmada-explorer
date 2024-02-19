import ValInfo from "@/app/components/ValInfo"


type Props = {
  params: {
    valAddr: string
  }
}

export default function page({ params: { valAddr } }: Props) {

  return (
    <div className="">
      <ValInfo valAddr={valAddr} />
    </div>
  )
}