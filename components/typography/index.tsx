export function TypographyH1({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  )
}

export function TypographyH2({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  )
}

export function TypographyH3({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  )
}

export function TypographyH4({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  )
}

export function TypographyP({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
}

export function TypographyBlockquote({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  )
}

export function TypographyTableWithBody({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <TypographyTableBody>{children}</TypographyTableBody>
      </table>
    </div>
  )
}

export function TypographyTable({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">{children}</table>
    </div>
  )
}

export function TypographyTableHead({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <thead>
      <tr className="m-0 border-t p-0 even:bg-muted">{children}</tr>
    </thead>
  )
}

export function TypographyTableBody({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <tbody>{children}</tbody>
}

export function TypographyTableRow({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <tr className="m-0 border-t p-0 first:bg-muted">{children}</tr>
}

export function TypographyTableHeader({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
      {children}
    </th>
  )
}

export function TypographyTableCell({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
      {children}
    </td>
  )
}

export function TypographyUL({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
}

export function TypographyOL({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
}

export function TypographyLI({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <li>{children}</li>
}

export function TypographyHR() {
  return <hr className="my-6 border-t" />
}

export function TypographyInlineCode({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  )
}

export function TypographyLead({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <p className="text-xl text-muted-foreground">{children}</p>
}

export function TypographyLarge({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="text-lg font-semibold">{children}</div>
}

export function TypographySmall({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <small className="text-sm font-medium leading-none">{children}</small>
}

export function TypographyMuted({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <p className="text-sm text-muted-foreground [&:not(:first-child)]:mt-2">{children}</p>
}
