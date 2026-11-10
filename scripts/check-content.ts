import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { postFrontmatterSchema } from "../src/lib/content/schema";
const directory=path.join(process.cwd(),"content","posts");
const files=fs.existsSync(directory)?fs.readdirSync(directory).filter((file)=>file.endsWith(".mdx")):[];
let errors=0;
for(const file of files){
  const slug=file.replace(/\.mdx$/i,"");
  const parsed=matter(fs.readFileSync(path.join(directory,file),"utf8"));
  const result=postFrontmatterSchema.safeParse(parsed.data);
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)){console.error("Invalid slug:",file);errors++;}
  if(!result.success){console.error("Invalid frontmatter:",file,result.error.issues);errors++;continue;}
  if(Number.isNaN(new Date(result.data.publishedAt).getTime())){console.error("Invalid publishedAt:",file);errors++;}
  if(result.data.coverImage&&!result.data.coverImage.startsWith("/media/images/")){console.error("Invalid coverImage path:",file);errors++;}
  console.log((result.data.status==="published"?"✓ published: ":"• draft: ")+slug);
}
if(errors){console.error("Content check failed:",errors);process.exit(1);}
console.log("Content check passed. "+files.length+" MDX file(s) checked.");
