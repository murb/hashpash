file = File.read('index_uncompressed.html')
require 'uglifier'

def uglify(file)
  uglifier = Uglifier.new(
    harmony: true,
    output: {
      comments: :none
    },
    compress: {
      drop_console: true,
      # unsafe: true,
    }
  )
  "<script>#{uglifier.compile(File.read(file))}</script>"
  "<script>#{File.read(file)}</script>"
end

# poor man's html compression :)
file.gsub!(/\n/,'')
file.gsub!(/\s\s/,'')

file = file.gsub(/\<script\ssrc\=\"([a-z]*\.js)\"\>\<\/script\>/) do
  uglify($1)
end



File.write('index.html',file)
p file.length < 10240 ? "Jep #{file.length}" : "Nope :( (#{file.length}, #{file.length-10272}  bytes to go)"
# `scp hashpash.html murb.nl:~/public/murb.nl/current/public`
# `cp hashpash.html ../murb.nl/source-murb.nl/public`